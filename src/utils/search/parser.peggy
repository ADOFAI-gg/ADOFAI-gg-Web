Expression = Chunk*

Chunk = ArgumentedChunk / NormalChunk / ' ' { return { type: 'normal', value: ' ', quoted: false } }

ArgumentedChunk = type:ArgumentName ':' value:ArgumentedChunkText ' '? {
  return {
    type,
    ...value
  }
}

ArgumentedChunkText = ArgumentedChunkContent

Escape = '\\'

ArgumentedChunkContent = ('"' content:ArgumentedChunkChars '"' { return { value: content, quote: '"' } }) / ("'" content:ArgumentedChunkChars "'" { return { value: content, quote: "'" } })
    / (text:[^ ]* { return { value: text.join(''), quote: null } })

ArgumentedChunkChars = chars:ArgumentedChunkChar* { return chars.join('') }

ArgumentedChunkChar =
    text:[^\\"'] / Escape sequence:(
        "\\" { return "\\" } /
        "\"" { return '"' } /
        "'" { return "'" } /
        v:[^"] { return '\\' + v }
    ) { return sequence }

ArgumentName = 'creator' / 'artist' / 'song'

NormalChunk = content:(NormalText)+ { 
  return { 
    type: 'normal',
    value: content.join(''),
    quote: null
  }
}

NormalText = text:NormalTextContent+ {
  return text.join('')
}

NormalTextContent = text:[^ ]
