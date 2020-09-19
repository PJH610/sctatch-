import classNames from "classnames";
import { connect } from "react-redux";
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
    intlShape,
} from "react-intl";
import PropTypes from "prop-types";
import bindAll from "lodash.bindall";
import bowser from "bowser";
import React from "react";

import VM from "scratch-vm";

import Box from "../box/box.jsx";
import Button from "../button/button.jsx";
import CommunityButton from "./community-button.jsx";
import ShareButton from "./share-button.jsx";
import { ComingSoonTooltip } from "../coming-soon/coming-soon.jsx";
import Divider from "../divider/divider.jsx";
import LanguageSelector from "../../containers/language-selector.jsx";
import SaveStatus from "./save-status.jsx";
import SBFileUploader from "../../containers/sb-file-uploader.jsx";
import ProjectWatcher from "../../containers/project-watcher.jsx";
import MenuBarMenu from "./menu-bar-menu.jsx";
import { MenuItem, MenuSection } from "../menu/menu.jsx";
import ProjectTitleInput from "./project-title-input.jsx";
import AuthorInfo from "./author-info.jsx";
import AccountNav from "../../containers/account-nav.jsx";
import LoginDropdown from "./login-dropdown.jsx";
import SB3Downloader from "../../containers/sb3-downloader.jsx";
import DeletionRestorer from "../../containers/deletion-restorer.jsx";
import TurboMode from "../../containers/turbo-mode.jsx";

import { openTipsLibrary } from "../../reducers/modals";
import { setPlayer } from "../../reducers/mode";
import {
    autoUpdateProject,
    getIsUpdating,
    getIsShowingProject,
    manualUpdateProject,
    requestNewProject,
    remixProject,
    saveProjectAsCopy,
} from "../../reducers/project-state";
import {
    openAccountMenu,
    closeAccountMenu,
    accountMenuOpen,
    openFileMenu,
    closeFileMenu,
    fileMenuOpen,
    openEditMenu,
    closeEditMenu,
    editMenuOpen,
    openLanguageMenu,
    closeLanguageMenu,
    languageMenuOpen,
    openLoginMenu,
    closeLoginMenu,
    loginMenuOpen,
} from "../../reducers/menus";

// new
import { setToolboxCut } from "../../reducers/toolbox-cut";
import SwitchoverComponent from "../switchover/switchover.jsx";

import collectMetadata from "../../lib/collect-metadata";

import styles from "./menu-bar.css";

import helpIcon from "../../lib/assets/icon--tutorials.svg";
import mystuffIcon from "./icon--mystuff.png";
import profileIcon from "./icon--profile.png";
import remixIcon from "./icon--remix.svg";
import dropdownCaret from "./dropdown-caret.svg";
import languageIcon from "../language-selector/language-icon.svg";

import scratchLogo from "./scratch-logo.svg";

import sharedMessages from "../../lib/shared-messages";

const ariaMessages = defineMessages({
    language: {
        id: "gui.menuBar.LanguageSelector",
        defaultMessage: "language selector",
        description: "accessibility text for the language selection menu",
    },
    tutorials: {
        id: "gui.menuBar.tutorialsLibrary",
        defaultMessage: "Tutorials",
        description: "accessibility text for the tutorials button",
    },
});

const MenuBarItemTooltip = ({
    children,
    className,
    enable,
    id,
    place = "bottom",
}) => {
    if (enable) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <ComingSoonTooltip
            className={classNames(styles.comingSoon, className)}
            place={place}
            tooltipClassName={styles.comingSoonTooltip}
            tooltipId={id}
        >
            {children}
        </ComingSoonTooltip>
    );
};

MenuBarItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    enable: PropTypes.bool,
    id: PropTypes.string,
    place: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

const MenuItemTooltip = ({ id, isRtl, children, className }) => (
    <ComingSoonTooltip
        className={classNames(styles.comingSoon, className)}
        isRtl={isRtl}
        place={isRtl ? "left" : "right"}
        tooltipClassName={styles.comingSoonTooltip}
        tooltipId={id}
    >
        {children}
    </ComingSoonTooltip>
);

MenuItemTooltip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string,
    isRtl: PropTypes.bool,
};

class MenuBar extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            "handleClickNew",
            "handleClickRemix",
            "handleClickSave",
            "handleClickSaveAsCopy",
            "handleClickSeeCommunity",
            "handleClickShare",
            "handleKeyPress",
            "handleLanguageMouseUp",
            "handleRestoreOption",
            "handleSaveToComputer",
            "restoreOptionMessage",
            "handleClickLink",
            "handleClickTest",
            // new
            "handleClickOnSetToolboxCut",
        ]);
        this.state = {
            link_state: false,
        };
    }
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }
    handleClickNew() {
        let readyToReplaceProject = true;
        // if the project is dirty, and user owns the project, we will autosave.
        // but if they are not logged in and can't save, user should consider
        // downloading or logging in first.
        // Note that if user is logged in and editing someone else's project,
        // they'll lose their work.
        if (this.props.projectChanged && !this.props.canCreateNew) {
            readyToReplaceProject = confirm(
                // eslint-disable-line no-alert
                this.props.intl.formatMessage(
                    sharedMessages.replaceProjectWarning
                )
            );
        }
        this.props.onRequestCloseFile();
        if (readyToReplaceProject) {
            this.props.onClickNew(
                this.props.canSave && this.props.canCreateNew
            );
        }
        this.props.onRequestCloseFile();
    }
    handleClickRemix() {
        this.props.onClickRemix();
        this.props.onRequestCloseFile();
    }
    handleClickSave() {
        this.props.onClickSave();
        this.props.onRequestCloseFile();
    }
    handleClickSaveAsCopy() {
        this.props.onClickSaveAsCopy();
        this.props.onRequestCloseFile();
    }
    handleClickSeeCommunity(waitForUpdate) {
        if (this.props.canSave) {
            // save before transitioning to project page
            this.props.autoUpdateProject();
            waitForUpdate(true); // queue the transition to project page
        } else {
            waitForUpdate(false); // immediately transition to project page
        }
    }
    handleClickShare(waitForUpdate) {
        if (!this.props.isShared) {
            if (this.props.canShare) {
                // save before transitioning to project page
                this.props.onShare();
            }
            if (this.props.canSave) {
                // save before transitioning to project page
                this.props.autoUpdateProject();
                waitForUpdate(true); // queue the transition to project page
            } else {
                waitForUpdate(false); // immediately transition to project page
            }
        }
    }
    handleRestoreOption(restoreFun) {
        return () => {
            restoreFun();
            this.props.onRequestCloseEdit();
        };
    }
    handleKeyPress(event) {
        const modifier = bowser.mac ? event.metaKey : event.ctrlKey;
        if (modifier && event.key === "s") {
            this.props.onClickSave();
            event.preventDefault();
        }
    }
    handleSaveToComputer(downloadProjectCallback) {
        return () => {
            this.props.onRequestCloseFile();
            downloadProjectCallback();
            if (this.props.onProjectTelemetryEvent) {
                const metadata = collectMetadata(
                    this.props.vm,
                    this.props.projectTitle,
                    this.props.locale
                );
                this.props.onProjectTelemetryEvent("projectDidSave", metadata);
            }
        };
    }
    handleLanguageMouseUp(e) {
        if (!this.props.languageMenuOpen) {
            this.props.onClickLanguage(e);
        }
    }
    restoreOptionMessage(deletedItem) {
        switch (deletedItem) {
            case "Sprite":
                return (
                    <FormattedMessage
                        defaultMessage="Restore Sprite"
                        description="Menu bar item for restoring the last deleted sprite."
                        id="gui.menuBar.restoreSprite"
                    />
                );
            case "Sound":
                return (
                    <FormattedMessage
                        defaultMessage="Restore Sound"
                        description="Menu bar item for restoring the last deleted sound."
                        id="gui.menuBar.restoreSound"
                    />
                );
            case "Costume":
                return (
                    <FormattedMessage
                        defaultMessage="Restore Costume"
                        description="Menu bar item for restoring the last deleted costume."
                        id="gui.menuBar.restoreCostume"
                    />
                );
            default: {
                return (
                    <FormattedMessage
                        defaultMessage="Restore"
                        description="Menu bar item for restoring the last deleted item in its disabled state." /* eslint-disable-line max-len */
                        id="gui.menuBar.restore"
                    />
                );
            }
        }
    }

    // new 切换编程模式
    handleClickOnSetToolboxCut() {
        const toolboxCutXML = this.props.toolboxCutXML;
        // console.log(this.props.toolboxCutXML);
        this.props.setToolboxCut(!toolboxCutXML);
    }

    // 打开link方法
    handleClickLink() {
        //var a = window.Blockly.getMainWorkspace()
        // console.log(typeof window.require != "undefined");
        if (typeof window.require == "undefined") {
            alert("当前为浏览器环境,请手动打开link_le连接主板!!!");
            return;
        }
        const path = window.require("path");
        const { remote } = window.require("electron");
        const base_path = path.dirname(remote.app.getPath("exe"));
        // 相对路径
        var execPath = base_path + "/link_le/link_le.exe";

        const exe = window.require("child_process").exec; //开一个子进程
        //'C:/arduino/link_le/link_le.exe'
        exe(execPath, function (error, stdout, stderr) {
            console.log("stdout: " + stdout);
            console.log("stderr: " + stderr);
            if (error !== null) {
                console.log("exec error: " + error); //没有错误产生，所以本行无输出
            }
        });

        // var electron = window.require("electron");
        // var ipc = electron.ipcRenderer;
        // ipc.send("getMsg", "open");
        // console.log("页面端运行到了这里!!");

        // let code = ``;

        // let filePath = "C:/Users/yanfa-00/Desktop/aaa/aaa.ino";
        // let fs = window.require("fs"); //文件
        // fs.writeFile(filePath, code, function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        // });
    }

    // 连接测试
    handleClickTest() {
        setTimeout(() => {
            let ws = new WebSocket("ws://localhost:3000");
            ws.onopen = function () {
                let buf = "0fffabcdef0d0a";
                let buf1 = new Buffer(buf, "hex");
                ws.send(buf1);
            };
            ws.onclose = function (event) {
                console.log("连接关闭");
            };
            ws.onerror = (event) => {
                ws.close();
                console.error("WebSocket error observed:", event);
                //console.log("连接可能中断 保存好项目 从新连接串口!!");
                this.setState({ link_state: false });
                alert("还没连接串口打开!!!");
            };
            // Promise 解决异步取值的问题
            function getServerMsg() {
                return new Promise((resolve, reject) => {
                    ws.onmessage = function (mes) {
                        let message = mes.data;
                        //console.log(message);
                        resolve(message);
                        //console.log(message);
                    };
                });
            }
            getServerMsg().then((ret) => {
                console.log(ret);
                if (ret === "1") {
                    this.setState({ link_state: true });
                    alert("连接成功!!");
                } else {
                    this.setState({ link_state: false });
                    alert("串口没有连接或者没有固件,检查串口以及固件是否正常!");
                }
            });
        }, 1000);
    }

    render() {
        // 增加的style
        const linkStyle = {
            color: this.state.link_state ? "#fff" : "rgb(248, 83, 83)",
        };

        const bbStyle = {
            color: "#fff",
        };

        const saveNowMessage = (
            <FormattedMessage
                defaultMessage="Save now"
                description="Menu bar item for saving now"
                id="gui.menuBar.saveNow"
            />
        );
        const createCopyMessage = (
            <FormattedMessage
                defaultMessage="Save as a copy"
                description="Menu bar item for saving as a copy"
                id="gui.menuBar.saveAsCopy"
            />
        );
        const remixMessage = (
            <FormattedMessage
                defaultMessage="Remix"
                description="Menu bar item for remixing"
                id="gui.menuBar.remix"
            />
        );
        const newProjectMessage = (
            <FormattedMessage
                defaultMessage="New"
                description="Menu bar item for creating a new project"
                id="gui.menuBar.new"
            />
        );
        const remixButton = (
            <Button
                className={classNames(styles.menuBarButton, styles.remixButton)}
                iconClassName={styles.remixButtonIcon}
                iconSrc={remixIcon}
                onClick={this.handleClickRemix}
            >
                {remixMessage}
            </Button>
        );
        return (
            <Box className={classNames(this.props.className, styles.menuBar)}>
                <div className={styles.mainMenu}>
                    <div className={styles.fileGroup}>
                        {/* logo */}
                        <div className={classNames(styles.menuBarItem)}>
                            <img
                                alt="Scratch"
                                className={classNames(styles.scratchLogo, {
                                    [styles.clickable]:
                                        typeof this.props.onClickLogo !==
                                        "undefined",
                                })}
                                draggable={false}
                                src={scratchLogo}
                                onClick={this.props.onClickLogo}
                            />
                        </div>
                        {/* 语言 */}
                        <div
                            className={classNames(
                                styles.menuBarItem,
                                styles.hoverable,
                                styles.languageMenu
                            )}
                        >
                            <div>
                                <img
                                    className={styles.languageIcon}
                                    src={languageIcon}
                                />
                                <img
                                    className={styles.languageCaret}
                                    src={dropdownCaret}
                                />
                            </div>
                            <LanguageSelector
                                label={this.props.intl.formatMessage(
                                    ariaMessages.language
                                )}
                            />
                        </div>
                        {/* 文件模块 保存 上传 */}
                        <div
                            className={classNames(
                                styles.menuBarItem,
                                styles.hoverable,
                                {
                                    [styles.active]: this.props.fileMenuOpen,
                                }
                            )}
                            onMouseUp={this.props.onClickFile}
                        >
                            <FormattedMessage
                                defaultMessage="File"
                                description="Text for file dropdown menu"
                                id="gui.menuBar.file"
                            />
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.fileMenuOpen}
                                place={this.props.isRtl ? "left" : "right"}
                                onRequestClose={this.props.onRequestCloseFile}
                            >
                                {/* 新作品 */}
                                <MenuSection>
                                    <MenuItem
                                        isRtl={this.props.isRtl}
                                        onClick={this.handleClickNew}
                                    >
                                        {newProjectMessage}
                                    </MenuItem>
                                </MenuSection>
                                {/* 三个条件 满足在成执行 */}
                                {(this.props.canSave ||
                                    this.props.canCreateCopy ||
                                    this.props.canRemix) && (
                                    <MenuSection>
                                        {this.props.canSave ? (
                                            <MenuItem
                                                onClick={this.handleClickSave}
                                            >
                                                {saveNowMessage}
                                            </MenuItem>
                                        ) : (
                                            []
                                        )}
                                        {this.props.canCreateCopy ? (
                                            <MenuItem
                                                onClick={
                                                    this.handleClickSaveAsCopy
                                                }
                                            >
                                                {createCopyMessage}
                                            </MenuItem>
                                        ) : (
                                            []
                                        )}
                                        {this.props.canRemix ? (
                                            <MenuItem
                                                onClick={this.handleClickRemix}
                                            >
                                                {remixMessage}
                                            </MenuItem>
                                        ) : (
                                            []
                                        )}
                                    </MenuSection>
                                )}
                                <MenuSection>
                                    {/* 从电脑上传 */}
                                    <SBFileUploader
                                        onUpdateProjectTitle={
                                            this.props.onUpdateProjectTitle
                                        }
                                    >
                                        {(
                                            className,
                                            renderFileInput,
                                            loadProject
                                        ) => (
                                            <MenuItem
                                                className={className}
                                                onClick={loadProject}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Load from your computer"
                                                    description={
                                                        "Menu bar item for uploading a project from your computer"
                                                    }
                                                    id="gui.menuBar.uploadFromComputer"
                                                />
                                                {renderFileInput()}
                                            </MenuItem>
                                        )}
                                    </SBFileUploader>
                                    {/* 保存到电脑 */}
                                    <SB3Downloader>
                                        {(
                                            className,
                                            downloadProjectCallback
                                        ) => (
                                            <MenuItem
                                                className={className}
                                                onClick={this.handleSaveToComputer(
                                                    downloadProjectCallback
                                                )}
                                            >
                                                <FormattedMessage
                                                    defaultMessage="Save to your computer"
                                                    description="Menu bar item for downloading a project to your computer"
                                                    id="gui.menuBar.downloadToComputer"
                                                />
                                            </MenuItem>
                                        )}
                                    </SB3Downloader>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>

                        {/* 分割线 */}
                        <Divider className={classNames(styles.divider)} />

                        {/* 编辑模块 */}
                        <div
                            className={classNames(
                                styles.menuBarItem,
                                styles.hoverable,
                                {
                                    [styles.active]: this.props.editMenuOpen,
                                }
                            )}
                            onMouseUp={this.props.onClickEdit}
                        >
                            <div className={classNames(styles.editMenu)}>
                                <FormattedMessage
                                    defaultMessage="Edit"
                                    description="Text for edit dropdown menu"
                                    id="gui.menuBar.edit"
                                />
                            </div>
                            <MenuBarMenu
                                className={classNames(styles.menuBarMenu)}
                                open={this.props.editMenuOpen}
                                place={this.props.isRtl ? "left" : "right"}
                                onRequestClose={this.props.onRequestCloseEdit}
                            >
                                <DeletionRestorer>
                                    {(
                                        handleRestore,
                                        { restorable, deletedItem }
                                    ) => (
                                        <MenuItem
                                            className={classNames({
                                                [styles.disabled]: !restorable,
                                            })}
                                            onClick={this.handleRestoreOption(
                                                handleRestore
                                            )}
                                        >
                                            {this.restoreOptionMessage(
                                                deletedItem
                                            )}
                                        </MenuItem>
                                    )}
                                </DeletionRestorer>
                                <MenuSection>
                                    <TurboMode>
                                        {(toggleTurboMode, { turboMode }) => (
                                            <MenuItem onClick={toggleTurboMode}>
                                                {turboMode ? (
                                                    <FormattedMessage
                                                        defaultMessage="Turn off Turbo Mode"
                                                        description="Menu bar item for turning off turbo mode"
                                                        id="gui.menuBar.turboModeOff"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        defaultMessage="Turn on Turbo Mode"
                                                        description="Menu bar item for turning on turbo mode"
                                                        id="gui.menuBar.turboModeOn"
                                                    />
                                                )}
                                            </MenuItem>
                                        )}
                                    </TurboMode>
                                </MenuSection>
                            </MenuBarMenu>
                        </div>
                    </div>
                    {/* 分割线 */}
                    <Divider className={classNames(styles.divider)} />
                    {/* 教程 */}
                    <div
                        aria-label={this.props.intl.formatMessage(
                            ariaMessages.tutorials
                        )}
                        className={classNames(
                            styles.menuBarItem,
                            styles.hoverable
                        )}
                        onClick={this.props.onOpenTipLibrary}
                    >
                        <img className={styles.helpIcon} src={helpIcon} />
                        <FormattedMessage {...ariaMessages.tutorials} />
                    </div>
                    {this.props.toolboxCutXML ? (
                        ""
                    ) : (
                        <>
                            {/* 分割线 */}
                            <Divider className={classNames(styles.divider)} />
                            {/* 增加的模块 */}
                            <div
                                className={classNames(
                                    styles.menuBarItem,
                                    styles.hoverable
                                )}
                                onClick={this.handleClickLink}
                            >
                                连接link
                            </div>
                            {/* 连接测试模块 */}
                            <Divider className={classNames(styles.divider)} />
                            &nbsp;
                            <div
                                className={classNames(
                                    styles.menuBarItem,
                                    styles.hoverable
                                    //styles.link_test
                                )}
                                style={linkStyle}
                                onClick={this.handleClickTest}
                            >
                                连接测试
                            </div>
                        </>
                    )}

                    {/* 分割线 */}
                    {/* <Divider className={classNames(styles.divider)} /> */}
                    {/* 搜索功能 */}
                    {/* {this.props.canEditTitle ? (
                        <div
                            className={classNames(
                                styles.menuBarItem,
                                styles.growable
                            )}
                        >
                            <MenuBarItemTooltip enable id="title-field">
                                <ProjectTitleInput
                                    className={classNames(
                                        styles.titleFieldGrowable
                                    )}
                                    onUpdateProjectTitle={
                                        this.props.onUpdateProjectTitle
                                    }
                                />
                            </MenuBarItemTooltip>
                        </div>
                    ) : this.props.authorUsername &&
                      this.props.authorUsername !== this.props.username ? (
                        <AuthorInfo
                            className={styles.authorInfo}
                            imageUrl={this.props.authorThumbnailUrl}
                            projectTitle={this.props.projectTitle}
                            userId={this.props.authorId}
                            username={this.props.authorUsername}
                        />
                    ) : null} */}
                    {/* 分享按钮 */}
                    {/* <div className={classNames(styles.menuBarItem)}>
                        {this.props.canShare ? (
                            (this.props.isShowingProject ||
                                this.props.isUpdating) && (
                                <ProjectWatcher
                                    onDoneUpdating={this.props.onSeeCommunity}
                                >
                                    {waitForUpdate => (
                                        <ShareButton
                                            className={styles.menuBarButton}
                                            isShared={this.props.isShared}
                                            onClick={() => {
                                                this.handleClickShare(
                                                    waitForUpdate
                                                )
                                            }}
                                        />
                                    )}
                                </ProjectWatcher>
                            )
                        ) : this.props.showComingSoon ? (
                            // 改动的地方
                            // <MenuBarItemTooltip id="share-button">
                            <ShareButton className={styles.menuBarButton} />
                        ) : (
                            //  </MenuBarItemTooltip>
                            []
                        )}
                        {this.props.canRemix ? remixButton : []}
                    </div>
                    <div
                        className={classNames(
                            styles.menuBarItem,
                            styles.communityButtonWrapper
                        )}
                    >
                        {this.props.enableCommunity ? (
                            (this.props.isShowingProject ||
                                this.props.isUpdating) && (
                                <ProjectWatcher
                                    onDoneUpdating={this.props.onSeeCommunity}
                                >
                                    {waitForUpdate => (
                                        <CommunityButton
                                            className={styles.menuBarButton}
                                            onClick={() => {
                                                this.handleClickSeeCommunity(
                                                    waitForUpdate
                                                )
                                            }}
                                        />
                                    )}
                                </ProjectWatcher>
                            )
                        ) : this.props.showComingSoon ? (
                            <MenuBarItemTooltip id="community-button">
                                <CommunityButton
                                    className={styles.menuBarButton}
                                />
                            </MenuBarItemTooltip>
                        ) : (
                            []
                        )}
                    </div> */}
                </div>

                {/* 登录模块 */}
                {/* 在account菜单中显示适当的UI，无论用户是否
                    登录，以及会话是否可用来登录 */}

                {/* new 切换代码模式 */}
                {/* <div
                    className={classNames(styles.menuBarItem, styles.hoverable)}
                    onClick={this.handleClickonSetToolboxCut}
                >
                    {this.props.toolboxCutXML ? "代码模式" : "在线模式"}
                </div> */}
                <div className={styles.switchCenter}>
                    <SwitchoverComponent
                        clickOnSetToolboxCut={this.handleClickOnSetToolboxCut}
                    />
                </div>

                <div className={styles.accountInfoGroup}>
                    {/* 新增版本号 */}
                    <div
                        className={classNames(
                            styles.menuBarItem,
                            styles.hoverable,
                            styles.version
                        )}
                    >
                        版本 2.0.0
                    </div>

                    {/* <div className={styles.menuBarItem}>
                        {this.props.canSave && <SaveStatus />}
                    </div>
                    {this.props.sessionExists ? (
                        this.props.username ? (
                            // ************ 用户已登录 ************
                            <React.Fragment>
                                <a href="/mystuff/">
                                    <div
                                        className={classNames(
                                            styles.menuBarItem,
                                            styles.hoverable,
                                            styles.mystuffButton
                                        )}
                                    >
                                        <img
                                            className={styles.mystuffIcon}
                                            src={mystuffIcon}
                                        />
                                    </div>
                                </a>
                                <AccountNav
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable,
                                        {
                                            [styles.active]: this.props
                                                .accountMenuOpen,
                                        }
                                    )}
                                    isOpen={this.props.accountMenuOpen}
                                    isRtl={this.props.isRtl}
                                    menuBarMenuClassName={classNames(
                                        styles.menuBarMenu
                                    )}
                                    onClick={this.props.onClickAccount}
                                    onClose={this.props.onRequestCloseAccount}
                                    onLogOut={this.props.onLogOut}
                                />
                            </React.Fragment>
                        ) : (
                            // ********* 用户未登录，但存在会话
                            // ********* 所以他们可以选择登录
                            <React.Fragment>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="join"
                                    onMouseUp={this.props.onOpenRegistration}
                                >
                                    <FormattedMessage
                                        defaultMessage="Join Scratch"
                                        description="Link for creating a Scratch account"
                                        id="gui.menuBar.joinScratch"
                                    />
                                </div>
                                <div
                                    className={classNames(
                                        styles.menuBarItem,
                                        styles.hoverable
                                    )}
                                    key="login"
                                    onMouseUp={this.props.onClickLogin}
                                >
                                    <FormattedMessage
                                        defaultMessage="Sign in"
                                        description="Link for signing in to your Scratch account"
                                        id="gui.menuBar.signIn"
                                    />
                                    <LoginDropdown
                                        className={classNames(
                                            styles.menuBarMenu
                                        )}
                                        isOpen={this.props.loginMenuOpen}
                                        isRtl={this.props.isRtl}
                                        renderLogin={this.props.renderLogin}
                                        onClose={this.props.onRequestCloseLogin}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    ) : (
                        // ******** 没有登录会话可用，所以不要显示登录内容
                        <React.Fragment>
                            {this.props.showComingSoon ? (
                                <React.Fragment>
                                    <MenuBarItemTooltip id="mystuff">
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.mystuffButton
                                            )}
                                        >
                                            <img
                                                className={styles.mystuffIcon}
                                                src={mystuffIcon}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                    <MenuBarItemTooltip
                                        id="account-nav"
                                        place={
                                            this.props.isRtl ? "right" : "left"
                                        }
                                    >
                                        <div
                                            className={classNames(
                                                styles.menuBarItem,
                                                styles.hoverable,
                                                styles.accountNavMenu
                                            )}
                                        >
                                            <img
                                                className={styles.profileIcon}
                                                src={profileIcon}
                                            />
                                            <span>{"scratch-cat"}</span>
                                            <img
                                                className={
                                                    styles.dropdownCaretIcon
                                                }
                                                src={dropdownCaret}
                                            />
                                        </div>
                                    </MenuBarItemTooltip>
                                </React.Fragment>
                            ) : (
                                []
                            )}
                        </React.Fragment>
                    )} */}
                </div>
            </Box>
        );
    }
}

MenuBar.propTypes = {
    accountMenuOpen: PropTypes.bool,
    authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    authorThumbnailUrl: PropTypes.string,
    authorUsername: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoUpdateProject: PropTypes.func,
    canCreateCopy: PropTypes.bool,
    canCreateNew: PropTypes.bool,
    canEditTitle: PropTypes.bool,
    canRemix: PropTypes.bool,
    canSave: PropTypes.bool,
    canShare: PropTypes.bool,
    className: PropTypes.string,
    editMenuOpen: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    fileMenuOpen: PropTypes.bool,
    intl: intlShape,
    isRtl: PropTypes.bool,
    isShared: PropTypes.bool,
    isShowingProject: PropTypes.bool,
    isUpdating: PropTypes.bool,
    languageMenuOpen: PropTypes.bool,
    loginMenuOpen: PropTypes.bool,
    onClickAccount: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickFile: PropTypes.func,
    onClickLanguage: PropTypes.func,
    onClickLogin: PropTypes.func,
    onClickLogo: PropTypes.func,
    onClickNew: PropTypes.func,
    onClickRemix: PropTypes.func,
    onClickSave: PropTypes.func,
    onClickSaveAsCopy: PropTypes.func,
    onLogOut: PropTypes.func,
    onOpenRegistration: PropTypes.func,
    onOpenTipLibrary: PropTypes.func,
    onProjectTelemetryEvent: PropTypes.func,
    onRequestCloseAccount: PropTypes.func,
    onRequestCloseEdit: PropTypes.func,
    onRequestCloseFile: PropTypes.func,
    onRequestCloseLanguage: PropTypes.func,
    onRequestCloseLogin: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onShare: PropTypes.func,
    onToggleLoginOpen: PropTypes.func,
    onUpdateProjectTitle: PropTypes.func,
    projectChanged: PropTypes.bool,
    projectTitle: PropTypes.string,
    renderLogin: PropTypes.func,
    sessionExists: PropTypes.bool,
    showComingSoon: PropTypes.bool,
    username: PropTypes.string,
    vm: PropTypes.instanceOf(VM).isRequired,
    // new
    toolboxCutXML: PropTypes.bool,
    setToolboxCut: PropTypes.func,
};

MenuBar.defaultProps = {
    onShare: () => {},
};

const mapStateToProps = (state) => {
    const loadingState = state.scratchGui.projectState.loadingState;
    const user =
        state.session && state.session.session && state.session.session.user;
    return {
        accountMenuOpen: accountMenuOpen(state),
        fileMenuOpen: fileMenuOpen(state),
        editMenuOpen: editMenuOpen(state),
        isRtl: state.locales.isRtl,
        isUpdating: getIsUpdating(loadingState),
        isShowingProject: getIsShowingProject(loadingState),
        languageMenuOpen: languageMenuOpen(state),
        locale: state.locales.locale,
        loginMenuOpen: loginMenuOpen(state),
        projectChanged: state.scratchGui.projectChanged,
        projectTitle: state.scratchGui.projectTitle,
        sessionExists:
            state.session && typeof state.session.session !== "undefined",
        username: user ? user.username : null,
        vm: state.scratchGui.vm,
        // new
        toolboxCutXML: state.scratchGui.toolboxCut.toolboxCutXML,
    };
};

const mapDispatchToProps = (dispatch) => ({
    autoUpdateProject: () => dispatch(autoUpdateProject()),
    onOpenTipLibrary: () => dispatch(openTipsLibrary()),
    onClickAccount: () => dispatch(openAccountMenu()),
    onRequestCloseAccount: () => dispatch(closeAccountMenu()),
    onClickFile: () => dispatch(openFileMenu()),
    onRequestCloseFile: () => dispatch(closeFileMenu()),
    onClickEdit: () => dispatch(openEditMenu()),
    onRequestCloseEdit: () => dispatch(closeEditMenu()),
    onClickLanguage: () => dispatch(openLanguageMenu()),
    onRequestCloseLanguage: () => dispatch(closeLanguageMenu()),
    onClickLogin: () => dispatch(openLoginMenu()),
    onRequestCloseLogin: () => dispatch(closeLoginMenu()),
    onClickNew: (needSave) => dispatch(requestNewProject(needSave)),
    onClickRemix: () => dispatch(remixProject()),
    onClickSave: () => dispatch(manualUpdateProject()),
    onClickSaveAsCopy: () => dispatch(saveProjectAsCopy()),
    onSeeCommunity: () => dispatch(setPlayer(true)),
    // new
    setToolboxCut: (data) => dispatch(setToolboxCut(data)),
});

export default injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(MenuBar)
);
