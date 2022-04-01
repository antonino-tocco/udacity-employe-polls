import * as React from 'react';

import { connect } from 'react-redux';
import {Container} from "@mui/material";

const Leaderboard = ({}) => {

    return (<Container>
        <h2>Leaderboard</h2>
    </Container>);
};

const mapStateToProps = ({}) => ({

});

const mapDispatchToProps = ({}) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);