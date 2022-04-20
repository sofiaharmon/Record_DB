import React from "react";
import { Container, Grid, Icon, Responsive } from "semantic-ui-react";

function BottomBar() {
    return (
        <footer>
            <div className="masthead background-header color-offwhite">
                <Container>
                    <Grid verticalAlign="middle">
                        <Grid.Row columns={1} textAlign="center" className="no-padding">
                            <Grid.Column width={16}
                                textAlign="center">
                                <p className="h7">
                                    Hear Again Records
                                    <br />
                                    201 SE 2nd Ave. Suite 105
                                    Gainesville, FL 32601
                                    <br />
                                    352-373-1800
                                </p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>


        </footer>
    );
}

export default BottomBar;
