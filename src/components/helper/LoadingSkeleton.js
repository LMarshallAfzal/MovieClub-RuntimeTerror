import React from 'react';
import {Skeleton} from "@mui/material";

function LoadingSkeleton(props) {
    return props.loading ? (
        props.children
    ) : <Skeleton variant="rectangular" sx={{bgcolor: "#5C5C5C"}}>
        {props.children}
    </Skeleton>
}

export default LoadingSkeleton;