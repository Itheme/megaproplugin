var addedStyle = "border: 1px solid #000000;";
var ellipsis = '<br><i>см. след. карт.</i>';
var secondCardPrefix = '<p align="center">- 2 -</p>';


String.prototype.truncate = function(n, ellipsis){
    var reg = new RegExp("[\\w]*[\\S]+", "g");
    var result = "";
    var index = 0; // supposed next index of match in this string
    while (match = reg.exec(this)) { // enumerating all tokens
        //console.log(match);
        //console.log(match.index);
        var matchLength = match[0].length;
        if (result.length + matchLength + match.index - index > n - ellipsis.length) {
            return result + ellipsis;
        }
        if (match.index > index) {
            result += this.substr(index, match.index - index);
            index = match.index;
        }
        index += matchLength;
        result += match[0];
    }
   return this;
}


    function addCardIfNeeded() {
        var biblioDiv = document.getElementById('cc-biblio');
        //var positionInfo = biblioDiv.getBoundingClientRect();
        //console.log(positionInfo)
        if (biblioDiv == null) return;
        if (biblioDiv.clientHeight < biblioDiv.scrollHeight) {
            var text = biblioDiv.innerHTML;//.replace(/&nbsp;/gi, " ");
            var splitPoint = text.length * 12 / 20;
            var firstCardText = text.truncate(splitPoint, ellipsis);
            splitPoint = firstCardText.length - ellipsis.length;
            var secondCardText = secondCardPrefix + text.substr(splitPoint, text.length - splitPoint);
            
            biblioDiv.innerHTML = firstCardText;
            var parentDiv = document.getElementsByClassName("catcard")[0];
            parentDiv.style.cssText += addedStyle;
            var divCopyTop = document.getElementById('cc-top-left').innerHTML;
            var divCopyBottomLeft = document.getElementById('cc-bottom-left').innerHTML;
            var divCopyBottomRight = document.getElementById('cc-bottom-right').innerHTML;
            var addedCardText = '<br><br>'
            addedCardText += '<div class="catcard cc-bs" style="' + addedStyle + '">';
            addedCardText += '    <div id="cc-top" class="cc-bs">';
            addedCardText += '        <div id="cc-top-left" class="cc-bs">'
            addedCardText += divCopyTop;
            addedCardText += '        </div>';
            addedCardText += '        <div id="cc-biblio" class="cc-bs">';
            addedCardText += secondCardText;
            addedCardText += '        </div>';
            addedCardText += '    </div>';
            addedCardText += '    <div id="cc-bottom" class="cc-bs">';
            addedCardText += '        <div id="cc-bottom-left" class="cc-bs">';
            addedCardText += divCopyBottomLeft;
            addedCardText += '        </div>';
            addedCardText += '        <div id="cc-bottom-right" class="cc-bs">';
            addedCardText += divCopyBottomRight;
            addedCardText += '        </div>';
            addedCardText += '    </div>';
            addedCardText += '</div>';
            document.body.innerHTML += addedCardText;
        }
    }

    function addBackCardIfNeeded() {
        var biblioDiv = document.getElementById('backcard');
        console.log(biblioDiv);
        if (biblioDiv == null) return false;
        if (biblioDiv.clientHeight < biblioDiv.scrollHeight) {
            var text = biblioDiv.innerHTML;//.replace(/&nbsp;/gi, " ");
            var splitPoint = text.length * 12 / 20;
            var firstCardText = text.truncate(splitPoint, ellipsis);
            splitPoint = firstCardText.length - ellipsis.length;
            var secondCardText = secondCardPrefix + text.substr(splitPoint, text.length - splitPoint);
            
            biblioDiv.innerHTML = firstCardText;
            biblioDiv.style.cssText += addedStyle;
            var addedCardText = '<br><br>'
            addedCardText += '<div class="catcard" style="' + addedStyle + '">';
            addedCardText += secondCardText;
            addedCardText += '</div>';
            document.body.innerHTML += addedCardText;
            return true;
        }
        return false;
    }
    
addCardIfNeeded();

addBackCardIfNeeded();

//setTimeout(function () { print();}, 5000);

