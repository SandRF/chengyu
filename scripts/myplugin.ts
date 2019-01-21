/**
 * 示例自定义插件，您可以查阅 http://developer.egret.com/cn/github/egret-docs/Engine2D/projectConfig/cmdExtensionPlugin/index.html
 * 了解如何开发一个自定义插件
 */
export class CustomPlugin implements plugins.Command {

    constructor() {
    }
    
    async onFile(file: plugins.File) {
        if (file.basename == "manifest.js") {
            let s = file.contents.toString();
            let arr = s.split("\n");
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].indexOf("lib.min.js") != -1) {
                    arr.unshift(arr[i]);
                    arr.splice(i + 1, 1);
                    s = arr.join('\n');
                    file.contents = new Buffer(s);
                    break;
                }
            }
        }
        return file;
    }

    async onFinish(commandContext: plugins.CommandContext) {

    }
}