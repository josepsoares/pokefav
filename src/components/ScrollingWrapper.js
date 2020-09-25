import React from 'react';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

class ScrollingWrapper extends React.Component {
    state = { hasScrolled: false }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        if (window.scrollY > 350 && !this.state.hasScrolled) {
            this.setState({ hasScrolled: true })
        } else if (window.scrollY < 350 && this.state.hasScrolled) {
            this.setState({ hasScrolled: false })
        }
    }

    scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    render() {
        let checkOpacity = this.state.hasScrolled ? 1 : 0
        return (
            <>
                <Fab style={{ backgroundColor: '#ffe066', opacity: checkOpacity, transition: 'all 0.3s', cursor: 'pointer', zIndex: '3', position: 'fixed', left: '90%', top: '85%' }} size="medium" onClick={this.scrollToTop}>
                    <NavigationIcon />
                </Fab>
                {this.props.children}
            </>
        )
    }
}

export default ScrollingWrapper