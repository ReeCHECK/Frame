"""Check both desktop layouts using the compiled local interface."""
import argparse
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--page', required=True)
parser.add_argument('--browser', required=True)
parser.add_argument('--screenshots')
args = parser.parse_args()
bridge = """window.webkit={messageHandlers:{frame:{postMessage(body){
 if(body.action==='setTool')window.receive({type:'state',files:[],selectedId:'',busy:false,outputDir:'',activeTool:body.tool,settings:{pngFPS:0,pngSize:0,pagQuality:0,gifQuality:50,audioQuality:50,gifFPS:15,gifSize:480,background:'white'}});
}}}};"""
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=args.browser, headless=True)
    try:
        page = browser.new_page()
        page.add_init_script(bridge)
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(Path(args.page).resolve().as_uri(), wait_until='networkidle')
        for width, height in [(1240, 820), (900, 560)]:
            page.set_viewport_size({'width': width, 'height': height})
            for tool in ['svga-pag', 'svga-gif', 'pag-gif', 'svga-png', 'pag-png', 'mp3', 'mp4-png']:
                page.locator(f'button[data-tool="{tool}"]').click()
                assert page.locator('button.active-tool').count() == 1
                assert page.locator('.format-art').get_attribute('data-empty-tool') == tool
                expected_input = 'MP3' if tool == 'mp3' else tool.split('-')[0].upper()
                assert expected_input in page.locator('#add-canvas').inner_text()
                assert expected_input in page.locator('#preview-empty p').inner_text()
                canvas = page.locator('#canvas').bounding_box()
                action = page.locator('#add-canvas').bounding_box()
                assert canvas and action and action['y'] >= canvas['y']
                assert action['y'] + action['height'] <= canvas['y'] + canvas['height'] + 1, (width, height, tool, canvas, action)
                assert page.locator('#convert').is_visible()
                if args.screenshots and tool in ['svga-png', 'mp3']:
                    folder = Path(args.screenshots); folder.mkdir(parents=True, exist_ok=True)
                    page.screenshot(path=str(folder / f'{tool}-{width}x{height}.png'))
        assert errors == [], errors
        print('PASS: seven matching empty states at 1240×820 and 900×560; import action fits canvas; no script errors.')
    finally:
        browser.close()
