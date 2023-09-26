import { useEffect, useState } from 'react'

import Prism from 'prismjs'
require('prismjs/components/prism-jsx.min')

export default function PreviewCode({
  showPreview,
  componentCode = '',
  handleSetType,
  showToggle = false,
  codeType = 'html',
}) {
  const [prismClass, setPrismClass] = useState('language-html')

  useEffect(() => Prism.highlightAll(), [componentCode])

  useEffect(() => {
    codeType === 'html' && setPrismClass('language-html')
    codeType === 'vue' && setPrismClass('language-html')
    codeType === 'jsx' && setPrismClass('language-jsx')
  }, [codeType])

  return <></>
}
