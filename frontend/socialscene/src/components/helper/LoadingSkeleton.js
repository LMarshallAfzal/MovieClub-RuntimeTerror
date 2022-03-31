import React from 'react';
import {Skeleton} from "@mui/material";

function LoadingSkeleton(props) {
    return props.loading ? (
        props.children
    ) : <Skeleton variant="rectangular">
            {props.children}
        </Skeleton>
}

export default LoadingSkeleton;