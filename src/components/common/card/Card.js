const Card = (props) => {
    const classes = 'card ' + (props.className ? props.className : '');
    
    return <div className={classes} role="region" >{props.children}</div>;
};

export default Card;
