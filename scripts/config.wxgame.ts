/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { ResSplitPlugin, UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    //压缩用到的库,和主题文件
                    new UglifyPlugin([
                        {
                            sources: ["main.js"],
                            target: "main.min.js"
                        },
                        {
                            sources: [
                                "libs/modules/egret/egret.js",
                                "libs/modules/eui/eui.js",
                                "libs/modules/assetsmanager/assetsmanager.js",
                                "libs/modules/tween/tween.js"
                            ],
                            target: "lib.min.js"
                        },
                        {
                            sources: ["resource/default.thm.js"],
                            target: "default.thm.min.js"
                        }
                    ]),
                    //将资源文件移出去
                    new ResSplitPlugin({
                        matchers: [
                            { from: "resource/**", to: `../${projectName}_wxgame_remote` }
                        ]
                    }),
                    //每次编译完都要在微信开发工具中修改manifest.js,确保lib.min.js最先加载
                    new ManifestPlugin({ output: 'manifest.js' }),
                    new CustomPlugin()
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
