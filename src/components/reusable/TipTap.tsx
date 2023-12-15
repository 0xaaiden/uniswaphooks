'use client'

import TurndownService from 'turndown'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'

import { Toolbar } from '@component/reusable/Toolbar'

export default function TipTap({
  description,
  onChange,
}: {
  description: string
  onChange: (richText: string) => void
}) {
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({}),
      Heading.configure({
        HTMLAttributes: {
          class: 'prose text-2xl font-bold text-slate-950',
          level: [2],
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          'prose-sm max-w-none min-h-[80px] w-full rounded-md border border-slate-500 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5',
      },
    },
    onUpdate({ editor }) {
      const html = editor.getHTML()
      //const markdown = turndownService.turndown(html)
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="flex flex-col justify-stretch">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
