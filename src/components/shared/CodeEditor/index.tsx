"use client"

import Editor from '@monaco-editor/react';

type Props = {
    language: string;
    value: string;
    height?: string
    onChange?: (value: string | undefined) => void;
}

const DEFAULT_LANGUAGE = 'javascript'

export const CodeEditor = ({
    language,
    value,
    height = '60vh',
    onChange
}: Props) => {

    const handleChange = (value: string | undefined) => {
        if(onChange) {
            onChange(value);
        }
    }
    
    return (
        <Editor 
            theme='vs-dark'
            height={height}
            defaultLanguage={DEFAULT_LANGUAGE}
            language={language ?? DEFAULT_LANGUAGE}
            onChange={handleChange}
            value={value || ''}
          />
    )
}