let boldCheckbox = document.getElementById('bold');
let italicCheckbox = document.getElementById('italic');
let underlineCheckbox = document.getElementById('underline');
let fontSelect = document.getElementById('font');
let colorInput = document.getElementById('color');
let sizeSelect = document.getElementById('size');
let caseSelect = document.getElementById('case');
let contentRadios = document.querySelectorAll('input[name="content"]');
let clearButton = document.querySelector('.button.clear');
let lettersButton = document.querySelector('.button.letters');
let wordsButton = document.querySelector('.button.words');
let textarea = document.querySelector('textarea');

let saveTextAreaToLocalStorage = () => {
    localStorage.setItem('savedTextArea', textarea.value);
};

let renderSavedTextArea = () => {
    let savedValue = localStorage.getItem('savedTextArea');
    if (savedValue) {
        textarea.value = savedValue;
    }
};

boldCheckbox.addEventListener('change', () => {
    textarea.style.fontWeight = boldCheckbox.checked ? 'bold' : 'normal';
});

italicCheckbox.addEventListener('change', () => {
    textarea.style.fontStyle = italicCheckbox.checked ? 'italic' : 'normal';
});

underlineCheckbox.addEventListener('change', () => {
    textarea.style.textDecoration = underlineCheckbox.checked ? 'underline' : 'none';
});

fontSelect.addEventListener('change', () => {
    if (fontSelect.value === 'space-mono') {
        textarea.style.fontFamily = "Space Mono";
    } else if (fontSelect.value === 'libre-bodoni') {
        textarea.style.fontFamily = "Libre Bodoni";
    } else {
        textarea.style.fontFamily = "Josefin Sans";
    }
});

colorInput.addEventListener('input', () => {
    textarea.style.color = colorInput.value;
});

sizeSelect.addEventListener('change', () => {
    if (sizeSelect.value === 'custom') {
        Swal.fire({
            title: 'Enter custom font size in px:',
            input: 'number',
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Apply',
            showLoaderOnConfirm: true,
            confirmButtonColor: "#003459",
            cancelButtonColor: "#003459",
            preConfirm: (customSize) => {
                textarea.style.fontSize = customSize ? customSize + 'px' : '';
            },
            allowOutsideClick: () => !Swal.isLoading(),
        });
    } else {
        textarea.style.fontSize = sizeSelect.value + 'px';
    }
    saveTextAreaToLocalStorage();
});

caseSelect.addEventListener('change', () => {
    let selectedCase = caseSelect.value;
    if (selectedCase === 'capitalize') {
        textarea.style.textTransform = 'capitalize';
    } else if (selectedCase === 'upper') {
        textarea.style.textTransform = 'uppercase';
    } else if (selectedCase === 'lower') {
        textarea.style.textTransform = 'lowercase';
    }
    saveTextAreaToLocalStorage();
});

contentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        textarea.style.textAlign = radio.value;
    });
    saveTextAreaToLocalStorage();
});

clearButton.addEventListener('click', () => {
    textarea.value = '';
    saveTextAreaToLocalStorage();
});

lettersButton.addEventListener('click', () => {
    let letterCount = textarea.value.replace(/[^a-z]/gi, '').length;
    Swal.fire({
        title: 'Letter Count',
        text: `Number of letters: ${letterCount}`,
        confirmButtonColor: '#003459',
    });
});

wordsButton.addEventListener('click', () => {
    let wordCount = textarea.value.trim().split(/\s+/).filter(Boolean).length;
    Swal.fire({
        title: 'Word Count',
        text: `Number of words: ${wordCount}`,
        confirmButtonColor: '#003459',
    });
});

renderSavedTextArea();