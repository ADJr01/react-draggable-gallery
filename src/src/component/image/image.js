import style from './image.module.css'
import {useState} from "react";
export default function (props) {
    const {item,index,item_id} = props;
    const [checked,setChecked] = useState(false);
    const [dragDivStyle,setDragDivStyle] = useState({
        backgroundImage: `url(${item})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundClip: 'border-box',
        borderRadius: '8px',
        cursor: 'pointer',
    });
    const onClick = ()=>{

    }
    const onCheck = (e)=>{
        setChecked(prev=>!prev);
        props.onCheck(item_id);
    }
    const onMouseUp = ()=>{
        setDragDivStyle({...dragDivStyle,cursor: 'pointer'});
    }

    const onDragStartEvent = (e)=>{
        if(props.showRadioBtn) return;
        const id = e.target.id;
        setDragDivStyle({
            ...dragDivStyle,
            cursor: 'move',
            transform: 'scale(1.1)',
        });
        props.onDraginit(id);
    }

    const onDragOver = (e)=>{
        if(props.showRadioBtn) return;
        props.onDragEvent(e.target.id);
    }

    const dragEnd = ()=>{
        if(props.showRadioBtn) return;
        setDragDivStyle({
            ...dragDivStyle,
            cursor: 'pointer',
            transform: 'scale(1)',
        });
        props.clearDrag();
    }



    return (
        <div id={item_id} style={{
            ...dragDivStyle,
            'border': props.isDragging?'1px solid #363062':
                props.isDoppable?'1px solid #FF6C22':''}}  onClick={onCheck} onDragStart={onDragStartEvent}  onDragOver={onDragOver}   onMouseDown={onClick} onDragEnd={dragEnd}  onMouseOut={onMouseUp} onMouseUp={onMouseUp} draggable={!props.showRadioBtn} className={`${style.gallery_image} ${index===0?`${style.grid_col_2} ${style.grid_row_2}`: ''}`}>
            <label htmlFor={`${item_id}_check`} />
            <input
                style={{display: props.showRadioBtn?'block':'none'}}
                id={`${item_id}_check`} type={"checkbox"} checked={checked} onChange={_=>{}} />
        </div>
    );
}
