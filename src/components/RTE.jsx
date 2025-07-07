import React from 'react'
import  { Editor } from '@tinymce/tinymce-react';
import conf from '../conf/conf';
import { Controller } from 'react-hook-form';
export default function RTE({name, control, label, defaultValue="" }) {
  return (
    <>
    <div className='w-full'>
        {label && <label className=' inline-block mb-1 pl-1'>{label}</label>}

        <Controller
        name={name || "Content"}
        control={control} 
        render={({field: onChange }) =>(
            <Editor 
            apiKey={conf.tinyMCEKey}
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
                height: 500,
                menubar: false,
                // plugins: [
                //   'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                //   'searchreplace', 'visualblocks', 'code', 'fullscreen',
                //   'insertdatetime', 'media', 'table', 'help', 'wordcount'
                // ],
                // toolbar:
                // 'undo redo | blocks | ' +
                // 'bold italic forecolor | alignleft aligncenter ' +
                // 'alignright alignjustify | bullist numlist outdent indent | ' +
                // 'removeformat | help',
                plugins: [
                'lists', 'link', 'code', 'fullscreen'
              ],
              toolbar: 'undo redo | bold italic | bullist numlist | link | code fullscreen',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onEditorChange={onChange}
             />
        )}/>
    </div>
    </>
  )
}

