Expression = Chunk*

Chunk = ArgumentedChunk / SpecialChunk / NormalChunk / ' ' { return { type: 'normal', value: ' ', quoted: false } }

ArgumentedChunk = type:ArgumentName ':' afterLabel:' '? value:ArgumentedChunkText afterExp:' '? {
  return {
    type,
    afterLabel,
    afterExp,
    ...value
  }
}

SpecialChunk = value:(DifficultyChunk / IntChunk / FloatChunk) afterExp:' '? { return { ...value, afterExp } }

DifficultyChunk = type:('minDifficulty' / 'maxDifficulty') ':' afterLabel:' '? value:DifficultyChunkValue { return { type, value, quote: null, afterLabel } }

DifficultyChunkValue = 'tiny' / '10' / '11' / '12' / '13' / '14' 
    / '15' / '16' / '17' / '18.5' / '18' / '19.5' / '19' / '20.0' / '20.1' / '20.2' / '20.3' / '20.4' / '20.5' 
    / '20.6' / '20.7' / '20.8' / '20.9' / '21' / '20' / '-1' / '1' / '2' / '3' / '4' / '5' / '6' / '7' / '8' / '9'

IntChunk = type:('minTiles' / 'maxTiles') ':' afterLabel:' '? value:Int { return { type, value, afterLabel } }
FloatChunk = type:('minBpm' / 'maxBpm') ':' afterLabel:' '? value:Float { return { type, value, afterLabel } }

Int = value:[0-9]+ { return value.join('') }

Float = int:Int float:('.' value:Int { return '.' + value })? { return int + (float ?? '') }

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
