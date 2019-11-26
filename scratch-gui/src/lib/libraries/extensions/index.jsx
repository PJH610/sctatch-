import React from 'react'
import { FormattedMessage } from 'react-intl'

import musicImage from './music.png'
import musicInsetImage from './music-small.svg'
import penImage from './pen.png'
import penInsetImage from './pen-small.svg'
import videoImage from './video-sensing.png'
import videoInsetImage from './video-sensing-small.svg'
import translateImage from './translate.png'
import translateInsetImage from './translate-small.png'
import microbitImage from './microbit.png'
import ev3Image from './ev3.png'
import wedoImage from './wedo.png'
import text2speechImage from './text2speech.png'
import text2speechInsetImage from './text2speech-small.svg'
import makeymakeyImage from './makeymakey.png'
import makeymakeyInsetImage from './makeymakey-small.svg'
import boostImage from './boost.png'
import boostInsetImage from './boost-small.svg'
//增加内容
// import helloworldImage from './helloworld.png';
// import helloworldInsetImage from './helloworld-small.svg';

import arduinoImage from './arduino.png'
import arduinoInsetImage from './arduino-small.svg'

import microbitPeripheralImage from './peripheral-connection/microbit/microbit-illustration.svg'
import microbitMenuImage from './peripheral-connection/microbit/microbit-small.svg'
import ev3PeripheralImage from './peripheral-connection/ev3/ev3-hub-illustration.svg'
import ev3MenuImage from './peripheral-connection/ev3/ev3-small.svg'
import wedoPeripheralImage from './peripheral-connection/wedo/wedo-illustration.svg'
import wedoMenuImage from './peripheral-connection/wedo/wedo-small.svg'
import wedoButtonImage from './peripheral-connection/wedo/wedo-button-illustration.svg'

export default [
    // 增加内容
    {
        name: (
            <FormattedMessage
                defaultMessage="LETOPO-UNO"
                description="Name for the 'arduino' extension"
                id="gui.extension.arduino.name"
            />
        ),
        extensionId: 'arduino',
        iconURL: arduinoImage,
        insetIconURL: arduinoInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="干你想干的事,拥有无限的可能.."
                description="Description for the 'arduino' extension"
                id="gui.extension.arduino.description"
            />
        ),
        featured: true
        // disabled: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicImage,
        insetIconURL: musicInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penImage,
        insetIconURL: penInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoImage,
        insetIconURL: videoInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechImage,
        insetIconURL: text2speechInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateImage,
        insetIconURL: translateInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyImage,
        insetIconURL: makeymakeyInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        featured: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        collaborator: 'micro:bit',
        iconURL: microbitImage,
        insetIconURL: microbitMenuImage,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        peripheralImage: microbitPeripheralImage,
        smallPeripheralImage: microbitMenuImage,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        collaborator: 'LEGO',
        iconURL: ev3Image,
        insetIconURL: ev3MenuImage,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        peripheralImage: ev3PeripheralImage,
        smallPeripheralImage: ev3MenuImage,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        extensionId: 'wedo2',
        collaborator: 'LEGO',
        iconURL: wedoImage,
        insetIconURL: wedoMenuImage,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        peripheralImage: wedoPeripheralImage,
        smallPeripheralImage: wedoMenuImage,
        peripheralButtonImage: wedoButtonImage,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    },
    {
        name: 'LEGO BOOST',
        extensionId: 'boost',
        collaborator: 'LEGO',
        iconURL: boostImage,
        insetIconURL: boostInsetImage,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        featured: true,
        disabled: true,
        bluetoothRequired: true,
        internetConnectionRequired: true
    }
    //增加内容
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="hello world"
    //             description="Name for the 'hello world' extension"
    //             id="gui.extension.helloworld.name"
    //         />
    //     ),
    //     extensionId: 'helloWorld',
    //     iconURL: helloworldImage,
    //     insetIconURL: helloworldInsetImage,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="hello world."
    //             description="Description for the 'hello world' extension"
    //             id="gui.extension.helloworld.description"
    //         />
    //     ),
    //     featured: true
    // },
    // eim
    // {
    //     name: (
    //         <FormattedMessage
    //             defaultMessage="eim"
    //             description="Name for the 'eim' extension"
    //             id="gui.extension.eim.name"
    //         />
    //     ),
    //     extensionId: 'eim',
    //     iconURL: helloworldImage,
    //     insetIconURL: helloworldInsetImage,
    //     description: (
    //         <FormattedMessage
    //             defaultMessage="eim."
    //             description="Description for the 'eim' extension"
    //             id="gui.extension.eim.description"
    //         />
    //     ),
    //     featured: true
    // },
    // arduino
]
