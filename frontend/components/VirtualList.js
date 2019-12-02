import React, {Component} from 'react';

/** Virtual list, renders only visible items.
 *    @param {Array<*>} data         List of data items
 *    @param {Function} renderRow    Renders a single row
 *    @param {Number} rowHeight      Static height of a row
 *    @param {Number} overscanCount  Amount of rows to render above and below visible area of the list
 *    @param {Boolean} [sync=false]  true forces synchronous rendering
 *    @example
 *        <VirtualList
 *            data={['a', 'b', 'c']}
 *            renderRow={ row => <div>{row}</div> }
 *            rowHeight={22}
 *            sync
 *        />
 */
//WARNING: Port of preact-virtual-list to react!
export default class VirtualList extends Component {
    constructor() {
        super();

        this.state = {
            height: 0,
            offset: 0
        }
    }

    resize = () => {
        if (this.state.height !== document.body.offsetHeight) {
            this.setState({height: document.body.offsetHeight});
        }
    };

    handleScroll = () => {
        this.setState({offset: document.querySelector(".list").scrollTop});
        if (this.props.sync) this.forceUpdate();
    };

    componentDidUpdate() {
        this.resize();
    }

    componentDidMount() {
        if (typeof window !== "undefined") {
            this.resize();
            window.addEventListener('resize', this.resize);
        }
    }

    componentWillUnmount() {
        if (typeof window !== "undefined") {
            window.removeEventListener('resize', this.resize);
        }
    }

    render() {
        const {data, rowHeight, renderRow, overscanCount = 10, sync, ...props} = this.props; //eslint-disable-line
        const {offset, height} = this.state;

        // first visible row index
        let start = (offset / rowHeight) | 0;

        // actual number of visible rows (without overscan)
        let visibleRowCount = (height / rowHeight) | 0;

        // Overscan: render blocks of rows modulo an overscan row count
        // This dramatically reduces DOM writes during scrolling
        if (overscanCount) {
            start = Math.max(0, start - (start % overscanCount));
            visibleRowCount += overscanCount;
        }

        // last visible + overscan row index
        let end = start + 1 + visibleRowCount;

        // data slice currently in viewport plus overscan items
        let selection = data.slice(start, end);

        const STYLE_INNER = {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            minHeight: '100%',
            height: `${data.length * rowHeight}px`
        };
        const STYLE_CONTENT = {
            position: 'absolute',
            top: `${start * rowHeight}px`,
            left: '0',
            height: '100%',
            width: '100%',
            overflow: 'visible'
        };

        return (
            <div onScroll={this.handleScroll} {...props}>
                <div style={STYLE_INNER}>
                    <div style={STYLE_CONTENT}>
                        {selection.map((data, key) => renderRow(data, key))}
                    </div>
                </div>
            </div>
        );
    }
}
