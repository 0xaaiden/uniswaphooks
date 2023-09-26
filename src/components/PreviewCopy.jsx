import { useState } from 'react'

import { useCopyToClipboard } from 'react-use'

import ButtonStyle from '@component/ButtonStyle'

export default function PreviewCopy({ componentCode = '' }) {
  const [buttonText, setButtonText] = useState('Copy')
  const [buttonEmoji, setButtonEmoji] = useState('📋')
  const [copyStatus, copyToClipboard] = useCopyToClipboard()

  const buttonActive = buttonText === 'Copied'

  function handleCopyToClipboard() {
    copyToClipboard(componentCode)

    if (copyStatus.error) {
      setButtonText('Error')
      setButtonEmoji('🚨')

      return
    }

    setButtonText('Copied')
    setButtonEmoji('🎉')

    setTimeout(() => {
      setButtonText('Copy')
      setButtonEmoji('📋')
    }, 3000)
  }

  return (
    <button className="block" onClick={handleCopyToClipboard}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={buttonActive}
      />
    </button>
  )
}

export function PreviewGithub({ repoUrl = '' }) {
  const [buttonText, setButtonText] = useState('GitHub')
  const [buttonEmoji, setButtonEmoji] = useState('👨‍💻')

  function handleButtonClick() {
    window.open(repoUrl, '_blank')
  }

  return (
    <button className="block" onClick={handleButtonClick}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={false}
      />
    </button>
  )
}
export function PreviewWebsite({ websiteUrl = '' }) {
  const [buttonText, setButtonText] = useState('Website')
  const [buttonEmoji, setButtonEmoji] = useState('🌐')

  function handleButtonClick() {
    window.open(websiteUrl, '_blank')
  }

  return (
    <button className="block" onClick={handleButtonClick}>
      <ButtonStyle
        buttonEmoji={buttonEmoji}
        buttonText={buttonText}
        buttonActive={false}
        // classAdd={"èpx"}
      />
    </button>
  )
}
