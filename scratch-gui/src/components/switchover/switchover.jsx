import classNames from "classnames";
import React from "react";
import styles from "./switchover.css";

const SwitchoverComponent = function (props) {
    const { clickOnSetToolboxCut } = props;

    return (
        <>
            {/* <!-- 注意：label的for属性 要与其对应的input的id相对应 --> */}
            {/* <input type="checkbox" id="toggle-button" className={styles.toggleButton} name="switch" onClick={clickonSetToolboxCut} />
      <label htmlFor="toggle-button" className={classNames(styles.buttonLabel)}>
        <span className={classNames(styles.circle)} ></span>
        <span className={classNames(styles.text, styles.on)} >离线</span>
        <span className={classNames(styles.text, styles.off)} >在线</span>
      </label> */}

            <label htmlFor="toggle" className={styles.toggle}>
                <input
                    type="checkbox"
                    id="toggle"
                    onClick={clickOnSetToolboxCut}
                />
                <div className={styles.switch}>
                    <span className={styles.on}>在线</span>
                    <span className={styles.off}>离线</span>
                </div>
            </label>
        </>
    );
};

export default SwitchoverComponent;
