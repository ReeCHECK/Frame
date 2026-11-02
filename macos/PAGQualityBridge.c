// Frame: adapt the converter's per-session Quality field before running its original encoder.
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
#include <unistd.h>
#include <errno.h>
#include <mach-o/dyld.h>
int main(int argc,char **argv){
 if(argc!=2){fprintf(stderr,"Expected PAG encoder session directory.\n");return 2;}
 const char *value=getenv("FRAME_PAG_QUALITY");char *end=NULL;long quality=value?strtol(value,&end,10):80;
 if(value&&(!*value||*end||quality<80||quality>98)){fprintf(stderr,"Invalid PAG quality.\n");return 2;}
 char path[PATH_MAX],tmp[PATH_MAX];if(snprintf(path,sizeof(path),"%s/EncoderParam.txt",argv[1])>=sizeof(path)||snprintf(tmp,sizeof(tmp),"%s/EncoderParam.frame.tmp",argv[1])>=sizeof(tmp))return 2;
 FILE *in=fopen(path,"rb");if(!in){perror("PAG parameters");return 2;}
 char data[8193];size_t n=fread(data,1,sizeof(data)-1,in);int extra=fgetc(in);fclose(in);if(extra!=EOF||n==0)return 2;data[n]=0;
 char *field=strstr(data,"\"Quality\"");if(!field)return 2;field=strchr(field,':');if(!field)return 2;field++;while(*field==' '||*field=='\t')field++;
 char *tail=NULL;strtol(field,&tail,10);if(tail==field||(*tail!=','&&*tail!=' '&&*tail!='}'))return 2;
 FILE *out=fopen(tmp,"wb");if(!out)return 2;int ok=fwrite(data,1,field-data,out)==(size_t)(field-data)&&fprintf(out,"%ld",quality)>0&&fwrite(tail,1,data+n-tail,out)==(size_t)(data+n-tail);
 if(fclose(out)!=0)ok=0;if(!ok||rename(tmp,path)!=0){unlink(tmp);return 2;}
 char executable[PATH_MAX];uint32_t len=sizeof(executable);if(_NSGetExecutablePath(executable,&len)!=0)return 2;char *slash=strrchr(executable,'/');if(!slash)return 2;*slash=0;
 char original[PATH_MAX];if(snprintf(original,sizeof(original),"%s/H264EncoderOriginal",executable)>=sizeof(original))return 2;
 argv[0]=original;execv(original,argv);perror("Original PAG encoder");return 2;
}
