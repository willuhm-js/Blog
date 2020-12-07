

exports.newLine = function(text) {
    let end = "";
    let i = 0
    for (i = 0; i < text.length; i++) {
      if (text[i] == "\n") {
        end += "<br>"
      } else {
        end += text[i]
      }
    }
  return end;
}

exports.removeDash = function(text) {
  let end = "";
    let i = 0
    for (i = 0; i < text.length; i++) {
    
      if (text[i] == "-") {
        end += " "
      } else {
        end += text[i]
      }
    }
  return end;
}

exports.removeSpaces = function(text) {
    let end = "";
    let i = 0
    for (i = 0; i < text.length; i++) {
    
      if (text[i] == " ") {
        end += "-"
      } else {
        end += text[i]
      }
    }
  return end;
}

exports.error = function(title, subtitle, res) {
  return res.render("etc/error", {title, subtitle})
}