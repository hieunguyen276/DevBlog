import React from 'react';
import { Editor, EditorConfig } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import styles from "./styles.module.scss";
import './styles.scss'

const CustomCKEditor = (props) => {
    const editorConfiguration = {
        toolbar: {
                    items: [
                        'exportPDF','exportWord', '|',
                        'findAndReplace', 'selectAll', '|',
                        'heading', '|',
                        'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
                        'bulletedList', 'numberedList', 'todoList', '|',
                        'outdent', 'indent', '|',
                        'undo', 'redo',
                        '-',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
                        'alignment', '|',
                        'link', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
                        'specialCharacters', 'horizontalLine', 'pageBreak', '|',
                        'textPartLanguage', '|',
                        'sourceEditing'
                    ],
                    shouldNotGroupWhenFull: true
                },
                // Changing the language of the interface requires loading the language file using the <script> tag.
                // language: 'es',
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
                placeholder: 'Welcome to CKEditor 5!',
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
                fontFamily: {
                    options: [
                        'default',
                        'Arial, Helvetica, sans-serif',
                        'Courier New, Courier, monospace',
                        'Georgia, serif',
                        'Lucida Sans Unicode, Lucida Grande, sans-serif',
                        'Tahoma, Geneva, sans-serif',
                        'Times New Roman, Times, serif',
                        'Trebuchet MS, Helvetica, sans-serif',
                        'Verdana, Geneva, sans-serif'
                    ],
                    supportAllValues: true
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
                fontSize: {
                    options: [ 10, 12, 14, 'default', 18, 20, 22 ],
                    supportAllValues: true
                },
                // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
                htmlSupport: {
                    allow: [
                        {
                            name: /.*/,
                            attributes: true,
                            classes: true,
                            styles: true
                        }
                    ]
                },
                // Be careful with enabling previews
                // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
                htmlEmbed: {
                    showPreviews: true
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
                link: {
                    decorators: {
                        addTargetToExternalLinks: true,
                        defaultProtocol: 'https://',
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
                mention: {
                    feeds: [
                        {
                            marker: '@',
                            feed: [
                                '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                                '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                                '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                                '@sugar', '@sweet', '@topping', '@wafer'
                            ],
                            minimumCharacters: 1
                        }
                    ]
                },
                // The "superbuild" contains more premium features that require additional configuration, disable them below.
                // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
                removePlugins: [
                    // These two are commercial, but you can try them out without registering to a trial.
                    // 'ExportPdf',
                    // 'ExportWord',
                    'AIAssistant',
                    'CKBox',
                    'CKFinder',
                    'EasyImage',
                    // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
                    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
                    // Storing images as Base64 is usually a very bad idea.
                    // Replace it on production website with other solutions:
                    // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
                    // 'Base64UploadAdapter',
                    'MultiLevelList',
                    'RealTimeCollaborativeComments',
                    'RealTimeCollaborativeTrackChanges',
                    'RealTimeCollaborativeRevisionHistory',
                    'PresenceList',
                    'Comments',
                    'TrackChanges',
                    'TrackChangesData',
                    'RevisionHistory',
                    'Pagination',
                    'WProofreader',
                    // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
                    // from a local file system (file://) - load this site via HTTP server if you enable MathType.
                    'MathType',
                    // The following features are part of the Productivity Pack and require additional license.
                    'SlashCommand',
                    'Template',
                    'DocumentOutline',
                    'FormatPainter',
                    'TableOfContents',
                    'PasteFromOfficeEnhanced',
                    'CaseChange'
                ],
                mediaEmbed: {
                    previewsInData: true
                }
            

    };

    // const handleKeyDown = (event) => {
    //     // Ngăn chặn hành vi mặc định của sự kiện
    //     event.preventDefault();
    
    //     // Tùy chọn: bạn có thể kiểm tra mã phím và thực hiện hành động khác
    //     console.log('Key pressed:', event.key);
    //   };

    return (
        <>
            <div className='card'>
                {/* begin::Editor */}
                <div className='mx-auto'>
                    <CKEditor
                        editor={Editor} // phiên bản của CKEditor đang sử dụng
                        config={editorConfiguration}
                        data={props.data}
                        onChange={props.onChange}
                        value={props.value}
                    // onReady={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    // onChange={(event, editor) => {
                    //     const data = editor.getData();
                    //     console.log({ event, editor, data });
                    // }}
                    // onBlur={(event, editor) => {
                    //     // console.log('Blur.', editor);
                    //     onBlur.preventDefault();
                    // }}
                    // onFocus={(event, editor) => {
                    //     // console.log('Focus.', editor);
                    //     onFocus.preventDefault();

                    // }}
                    //     onKeyDown={handleKeyDown}
                    />
                </div>
                {/* end::Editor */}
            </div>
        </>
    )
}

export default CustomCKEditor;

//     toolbar: {
//         items: [
//             'exportPDF','exportWord', '|',
//             'findAndReplace', 'selectAll', '|',
//             'heading', '|',
//             'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
//             'bulletedList', 'numberedList', 'todoList', '|',
//             'outdent', 'indent', '|',
//             'undo', 'redo',
//             '-',
//             'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
//             'alignment', '|',
//             'link', 'uploadImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
//             'specialCharacters', 'horizontalLine', 'pageBreak', '|',
//             'textPartLanguage', '|',
//             'sourceEditing'
//         ],
//         shouldNotGroupWhenFull: true
//     },
//     // Changing the language of the interface requires loading the language file using the <script> tag.
//     // language: 'es',
//     list: {
//         properties: {
//             styles: true,
//             startIndex: true,
//             reversed: true
//         }
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html#configuration
//     heading: {
//         options: [
//             { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
//             { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
//             { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
//             { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
//             { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
//             { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
//             { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
//         ]
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/editor-placeholder.html#using-the-editor-configuration
//     placeholder: 'Welcome to CKEditor 5!',
//     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-family-feature
//     fontFamily: {
//         options: [
//             'default',
//             'Arial, Helvetica, sans-serif',
//             'Courier New, Courier, monospace',
//             'Georgia, serif',
//             'Lucida Sans Unicode, Lucida Grande, sans-serif',
//             'Tahoma, Geneva, sans-serif',
//             'Times New Roman, Times, serif',
//             'Trebuchet MS, Helvetica, sans-serif',
//             'Verdana, Geneva, sans-serif'
//         ],
//         supportAllValues: true
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/font.html#configuring-the-font-size-feature
//     fontSize: {
//         options: [ 10, 12, 14, 'default', 18, 20, 22 ],
//         supportAllValues: true
//     },
//     // Be careful with the setting below. It instructs CKEditor to accept ALL HTML markup.
//     // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html#enabling-all-html-features
//     htmlSupport: {
//         allow: [
//             {
//                 name: /.*/,
//                 attributes: true,
//                 classes: true,
//                 styles: true
//             }
//         ]
//     },
//     // Be careful with enabling previews
//     // https://ckeditor.com/docs/ckeditor5/latest/features/html-embed.html#content-previews
//     htmlEmbed: {
//         showPreviews: true
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/link.html#custom-link-attributes-decorators
//     link: {
//         decorators: {
//             addTargetToExternalLinks: true,
//             defaultProtocol: 'https://',
//             toggleDownloadable: {
//                 mode: 'manual',
//                 label: 'Downloadable',
//                 attributes: {
//                     download: 'file'
//                 }
//             }
//         }
//     },
//     // https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#configuration
//     mention: {
//         feeds: [
//             {
//                 marker: '@',
//                 feed: [
//                     '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
//                     '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
//                     '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
//                     '@sugar', '@sweet', '@topping', '@wafer'
//                 ],
//                 minimumCharacters: 1
//             }
//         ]
//     },
//     // The "superbuild" contains more premium features that require additional configuration, disable them below.
//     // Do not turn them on unless you read the documentation and know how to configure them and setup the editor.
//     removePlugins: [
//         // These two are commercial, but you can try them out without registering to a trial.
//         // 'ExportPdf',
//         // 'ExportWord',
//         'AIAssistant',
//         'CKBox',
//         'CKFinder',
//         'EasyImage',
//         // This sample uses the Base64UploadAdapter to handle image uploads as it requires no configuration.
//         // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/base64-upload-adapter.html
//         // Storing images as Base64 is usually a very bad idea.
//         // Replace it on production website with other solutions:
//         // https://ckeditor.com/docs/ckeditor5/latest/features/images/image-upload/image-upload.html
//         // 'Base64UploadAdapter',
//         'MultiLevelList',
//         'RealTimeCollaborativeComments',
//         'RealTimeCollaborativeTrackChanges',
//         'RealTimeCollaborativeRevisionHistory',
//         'PresenceList',
//         'Comments',
//         'TrackChanges',
//         'TrackChangesData',
//         'RevisionHistory',
//         'Pagination',
//         'WProofreader',
//         // Careful, with the Mathtype plugin CKEditor will not load when loading this sample
//         // from a local file system (file://) - load this site via HTTP server if you enable MathType.
//         'MathType',
//         // The following features are part of the Productivity Pack and require additional license.
//         'SlashCommand',
//         'Template',
//         'DocumentOutline',
//         'FormatPainter',
//         'TableOfContents',
//         'PasteFromOfficeEnhanced',
//         'CaseChange'
//     ]
// }

// toolbar: {
//     items: [
//         'alignment',
//         'heading',
//         '|',
//         'bold',
//         'italic',
//         'link',
//         'bulletedList',
//         'numberedList',
//         '|',
//         'outdent',
//         'indent',
//         '|',
//         'imageUpload',
//         'blockQuote',
//         'insertTable',
//         'mediaEmbed',
//         'undo',
//         'redo'
//     ]
// },

// // This value must be kept in sync with the language defined in webpack.config.js.
// language: 'en',
// image: {
//     toolbar: [
//         'imageTextAlternative',
//         'toggleImageCaption',
//         'imageStyle:inline',
//         'imageStyle:block',
//         'imageStyle:side'
//     ]
// },
// table: {
//     contentToolbar: [
//         'tableColumn',
//         'tableRow',
//         'mergeTableCells'
//     ]
// }


