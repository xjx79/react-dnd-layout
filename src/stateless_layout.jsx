import React from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onChange(
        update(props.children , {
          $splice: [
            [0,0,monitor.getItem()]
          ]
        })
      );
      return props;
    }
  }
};

const Layout = (props, { components }) => {
  const { onChange, connectDropTarget, children } = props;

  const removeItem = idx => () => {
    onChange(update(props.children, {$splice: [[idx, 1]]}));
  };
  const renderItems = children.map((item, idx) => {
    const Comp = components[item.type];
    return (
      <Wrapper
        key={item.id}
        onDragStart={() => setTimeout(removeItem(idx), 50)}>
        <Comp id={item.id} {...item.props} type={item.type} />
      </Wrapper>
    );
  });

  const styles = style(props);

  return connectDropTarget(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
};

const style = ({ row, isOverCurrent, children }) => ({
  container: {
    minHeight: children.length ? null : 75,
    padding: 20,
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
    flexWrap: 'wrap',
    background: isOverCurrent ? 'rgba(53,181,229, 0.3)' : null,
    // background: '#333'
  },
});

Layout.contextTypes = {
  components: React.PropTypes.object
};


const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(Layout);

LayoutContainer.defaultProps = {
  children: [],
  onChange: children => console.log(children)
};

export default LayoutContainer;
