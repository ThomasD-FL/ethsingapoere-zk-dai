import React, { Component } from 'react'
import { MDBContainer, Animation } from 'mdbreact'

class Swapper extends Component {
    render() {

        const kyberWidget = (<a href='https://widget.kyber.network/v0.3/?type=pay&mode=popup&theme=light&receiveAddr=0x187dc8FF9092471A71e344C18F52Cad17e43d719&receiveToken=DAI&callback=https%3A%2F%2Fkyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=ropsten'
        class='kyber-widget-button' name='KyberWidget - Powered by KyberNetwork' title='Pay with tokens'
        target='_blank'>Pay with tokens</a>);

        return (
            <Animation type="fadeIn">

                <MDBContainer className="text-center">
                    {kyberWidget}
                </MDBContainer>
            </Animation>
        );
    }
}

export default Swapper