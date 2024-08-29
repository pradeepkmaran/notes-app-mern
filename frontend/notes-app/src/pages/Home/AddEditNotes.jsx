import React, { useState } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';


const AddEditNotes = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const onClose= () => {

    };

    return (
        <div> 

            <button className='' onClick={onClose}>
                <MdClose className='text-xl text-slate-400'/>
            </button>

            <div className="flex flex-col gap-2">
                <label className='input-label'>TITLE</label>
                <input className='text-2xl text-slate-950 outline-none'
                    text='text'
                    placeholder='Go to gym at 5pm'
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>    

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea  className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                    type='text'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <TagInput tags={tags} setTags={setTags} />
            </div>

            <button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>ADD</button>
        </div>
    );
}

export default AddEditNotes;