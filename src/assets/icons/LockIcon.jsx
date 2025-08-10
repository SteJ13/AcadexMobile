import * as React from "react"
import Svg, { Path } from 'react-native-svg';

const LockIcon = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" {...props}>
        <Path fill="currentColor" d="M256 160v64h128v-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zm-64 64v-64c0-70.7 57.3-128 128-128s128 57.3 128 128v64c35.3 0 64 28.7 64 64v224c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V288c0-35.3 28.7-64 64-64z" />
    </Svg>
)
export default LockIcon
