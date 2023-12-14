'use client'

import { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toolbar } from '@component/reusable/Toolbar'

export default function TipTap(description, onChange) {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description.value,
    editorProps: {
      attributes: {
        class:
          'flex min-h-[80px] w-full rounded-md border border-slate-500 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
