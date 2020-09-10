import classNames from "classnames";
import React from "react";
import styles from "./switchover.css";

const SwitchoverComponent = function (props) {
    const { clickOnSetToolboxCut } = props;

    return (
        <div className={classNames(styles.toggleButtonWrapper)}>
            {/* <!-- 注意：label的for属性 要与其对应的input的id相对应 --> */}
            <input
                type="checkbox"
                id="toggle-button"
                className={styles.toggleButton}
                name="switch"
                onClick={clickOnSetToolboxCut}
            />
            <label
                htmlFor="toggle-button"
                className={classNames(styles.buttonLabel)}
            >
                <span className={classNames(styles.circle)}></span>
                <span className={classNames(styles.text, styles.on)}>离线</span>
                <span className={classNames(styles.text, styles.off)}>
                    在线
                </span>
            </label>
        </div>
    );
};
// SwitchoverComponent.propTypes = {
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   onClick: PropTypes.func.isRequired,
//   title: PropTypes.string
// };
// SwitchoverComponent.defaultProps = {
//   active: false,
//   title: 'Go'
// };
export default SwitchoverComponent;
