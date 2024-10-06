let counter=0;
setTimeout(function() {
    document.getElementById('loading-container').style.display = 'none';

    // إظهار المحتوى الرئيسي
    var mainContent = document.getElementsByClassName('main-content');
    if (mainContent.length > 0) {
        mainContent[0].style.display = 'block'; // إظهار العنصر الأول
    }
}, 3000);
let progress = 0;
const progressBar = document.querySelector('.progress');
const loadingText = document.getElementById('loading-text');

function simulateLoading() {
    if (progress < 100) {
        progress++;
        progressBar.style.width = progress + '%';
        loadingText.textContent = progress + '%';
        setTimeout(simulateLoading, 10); // Adjust the speed here
    } else {
        loadingText.textContent = "Game Loaded!";
        // Redirect to another page after loading completes
        setTimeout(function() {
            window.location.href = "index.html"; // Replace with the desired page URL
        }, 20000); // Delay 1 second before redirecting
    }
}

window.onload = simulateLoading;


let currentQuestion = 0;
const questions = [
    {
        options: ["Father", "Brother", "Mother"],
        correct: "Brother",
        question: "This Is My ...... Jack",
        background: "url('1.jpg')",
       
    },
    {
        options: ["sister", "Father", "Mother"],
        correct: "sister",
        question: "This Is My ......",
        background: "url('2.webp')",
       
    },
    {
        options: ["Moon", "Apple", "You"],
        correct: "You",
        question: "Nice To Meet ......",
        background: "url('4.webp')",
       
    },
];


// الأسئلة والجمل الصحيحة للعبة ترتيب الجمل
let currentWordGameQuestion = 0;
const wordGameQuestions = [
    {
        words: ["To", "Nice", "Meet", "you"],
        correctSentence: ["Nice", "To", "Meet", "you"],
        background: "url('3.webp')",
        sentence: "Nice to meet you",  // الجملة
        sentenceAudio: "niccc.mp3", 
        
    },
    {
        words: ["To", "Nice", "Meet", "Too", "You"],
        correctSentence: ["Nice", "To", "Meet", "You", "Too"],
        background: "url('4.webp')",
        sentence: "Nice to meet you too",  // الجملة
        sentenceAudio: "tooooo.mp3", 
       
    },
    {
        words: ["Jack", "Brother", "is", "My","This"],
        correctSentence: ["This","is","My", "Brother", "Jack"],
        background: "url('4.webp')",
        sentence: "This is my brother jack",  // الجملة
        sentenceAudio: "brotheeeeer.mp3", 
    
       
    }
];
const sounds = {
    "Father": "father.mp3",
    "Brother": "newbrother.mp3",
    "Mother": "mother.mp3",
    "sister": "newsister.mp3",
    "This Is My ...... Jack": "brotheeeeer.mp3",
    "This Is My ......": "sisssster.mp3",
    "Nice To Meet ......":"niccc.mp3",
    "You":"you new.mp3",
    "Moon":"moon.mp3",
    "Apple":"Apple.mp3",
    // أضف المزيد من الأصوات للكلمات الأخرى هنا
};

// وظيفة تشغيل الصوت
function playSound(word) {
    const audioSrc = sounds[word]; // المسار الصوتي المرتبط بالكلمة
    if (audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play().catch(error => {
            console.error('حدث خطأ أثناء تشغيل الصوت:', error);
        });
    } else {
        console.log(`لا يوجد ملف صوت لهذه الكلمة: ${word}`);
    }
}
    
        let sentence = [];
        
        const buttonsContainer = document.getElementById("buttons-container");
        const sentenceElement = document.getElementById("sentence");



        // تحميل لعبة ترتيب الجمل
function loadWordGame() {
    sentence = [];
    sentenceElement.textContent = "";
    buttonsContainer.innerHTML = "";
    document.getElementById('score2').innerText = counter;
    document.getElementById('question').innerText = question.question;
        
    // تشغيل صوت السؤال مرتين عند تحميل السؤال
    playSoundForQuestion(question.question);

    //document.getElementById('feedback-word-game').innerText = ''; // تفريغ رسالة الفيدباك
    const wordGameContent = document.getElementById('word-game');
    const currentGame = wordGameQuestions[currentWordGameQuestion];
    
    
    let sentenceDropzoneContent = `
    <canvas id="confettiCanvas"></canvas>
        <h2 id="question" class="spicy-rice-regular">${currentGame.sentence}</h2>  
    <h1 class="spicy-rice-regular">Score:<p id='score2'>${counter}</p></h1>
    <div id="buttons-container2"></div>
    <br>
    <div id="sentence-dropzone">
        <!-- يتم إنشاء مستطيلات فارغة يتم إسقاط الكلمات فيها -->
        <div class="dropzone"></div>
        <div class="dropzone"></div>
        <div class="dropzone"></div>
        <div class="dropzone"></div>
`;

// التحقق من السؤال الحالي وإضافة مستطيل إضافي إذا كان السؤال هو الأول
if (currentWordGameQuestion == 1) {
    sentenceDropzoneContent += `<div class="dropzone"></div>`;
}
if (currentWordGameQuestion == 2) {
    sentenceDropzoneContent += `<div class="dropzone"></div>`;
}
const questionTextElement = document.getElementById('question');
if (questionTextElement) {
    questionTextElement.innerText = currentGame.sentence;  // عرض الجملة
} else {
    console.error('العنصر الذي يحمل معرف "question" غير موجود!');
}
        // تشغيل الصوت المرتبط بالجملة مرتين
        playSentenceAudio(currentGame.sentenceAudio);
        
        function playSentenceAudio(audioSrc) {
            if (audioSrc) {
                const audio = new Audio(audioSrc); // إنشاء كائن الصوت
                audio.play().then(() => {
                    setTimeout(() => {
                        const audioSecondPlay = new Audio(audioSrc);
                        audioSecondPlay.play();  // تشغيل الصوت مرة ثانية بعد 1.5 ثانية
                    }, 2000); // تأخير 1.5 ثانية قبل التشغيل الثاني
                }).catch(error => {
                    console.error('حدث خطأ أثناء تشغيل الصوت:', error);
                });
            } else {
                console.log(`لا يوجد ملف صوت لهذا السؤال: ${audioSrc}`);
            }
        }
// إغلاق div الخاص بالـ dropzone
sentenceDropzoneContent += `</div>`;

// وضع المحتوى في الـ innerHTML
wordGameContent.innerHTML = sentenceDropzoneContent;
    
            const buttonsContainer2 = document.getElementById("buttons-container2");

    // تغيير الخلفية بناءً على السؤال الحالي
    document.body.style.backgroundImage = currentGame.background;
        console.log(currentGame);
    // إنشاء أزرار الكلمات القابلة للسحب
    let draggedButton = null; // الزر الذي يتم سحبه
    let draggedWord = ""; // الكلمة التي يتم سحبها
    
   // إضافة أزرار الكلمات القابلة للسحب

currentGame.words.forEach((word, i) => {
    const button1 = document.createElement("button");
    button1.textContent = word;
    button1.setAttribute("id", `button-${i}`);
    button1.setAttribute("draggable", true); // السحب للأجهزة المكتبية
    button1.classList.add('draggable'); // إضافة كلاس للسحب

    // حفظ الموضع الأصلي للزر
    const originalPosition = button1.getBoundingClientRect();

    // دعم السحب والإسقاط على الكمبيوتر
    button1.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("word", word);
        event.dataTransfer.setData("buttonId", event.target.id);
        playWordSound(word);
    });

    // دعم اللمس على الهواتف المحمولة
    button1.addEventListener("touchstart", (event) => {
        event.preventDefault();
        playWordSound(word); // تشغيل الصوت عند لمس الزر
        button1.style.position = "absolute";
        const touch = event.touches[0];
        moveButton(button1, touch.clientX, touch.clientY);

        // دعم تحريك الزر باللمس
        button1.addEventListener("touchmove", (event) => {
            event.preventDefault();
            const touchMove = event.touches[0];
            moveButton(button1, touchMove.clientX, touchMove.clientY);
        });

        // عندما يترك المستخدم الشاشة
        button1.addEventListener("touchend", (event) => {
            event.preventDefault();
            const touchEnd = event.changedTouches[0];
            const dropzone = document.elementFromPoint(touchEnd.clientX, touchEnd.clientY);

            // التحقق إذا كان الإسقاط في المنطقة الصحيحة
            if (dropzone && dropzone.classList.contains('dropzone')) {
                const index = Array.from(dropzones).indexOf(dropzone);
                if (currentGame.correctSentence[index] === word) {
                    dropzone.textContent = word;
                    sentence[index] = word;
                    button1.style.display = "none"; // إخفاء الزر بعد وضعه في المكان الصحيح
                    const correctSound = new Audio('ممتاز.mp3');
                    correctSound.play();
                } else {
                    revertButton(button1, originalPosition); // إرجاع الزر إلى مكانه الأصلي
                    const wrongSound = new Audio('wrongg.mp3');
                    wrongSound.play();
                }
            } else {
                // إذا لم يتم إسقاطه في منطقة صحيحة، أعد الزر إلى مكانه الأصلي
                revertButton(button1, originalPosition);
            }

            checkWordGameAnswer(); // التحقق من الجملة بعد إسقاط الكلمة
        });
    });

    buttonsContainer2.appendChild(button1);
});

// وظيفة لتحريك الزر باللمس
function moveButton(button, x, y) {
    button.style.left = `${x - button.offsetWidth / 2}px`;
    button.style.top = `${y - button.offsetHeight / 2}px`;
}

// وظيفة لإرجاع الزر إلى مكانه الأصلي بشكل سلس
function revertButton(button, originalPosition) {
    button.style.transition = 'all 0.3s ease'; // حركة سلسة
    button.style.left = `${originalPosition.left}px`;
    button.style.top = `${originalPosition.top}px`;

    // إعادة تعيين الحركة بعد الانتهاء
    setTimeout(() => {
        button.style.transition = '';
        button.style.position = 'static'; // إعادة تعيين الوضع
    }, 300);
}

// إضافة مستطيلات الإسقاط (dropzones)
const dropzones = document.querySelectorAll(".dropzone");

dropzones.forEach((dropzone, index) => {
    // للسحب العادي على الكمبيوتر
    dropzone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    dropzone.addEventListener("drop", (event) => {
        event.preventDefault();
        const word = event.dataTransfer.getData("word");
        const buttonId = event.dataTransfer.getData("buttonId");

        if (currentGame.correctSentence[index] === word) {
            dropzone.textContent = word;
            sentence[index] = word;
            const buttonToHide = document.getElementById(buttonId);
            if (buttonToHide) {
                buttonToHide.style.display = 'none';
            }
            const correctSound = new Audio('ممتاز.mp3');
            correctSound.play();
        } else {
            const wrongSound = new Audio('wrongg.mp3');
            wrongSound.play();
        }

        checkWordGameAnswer(); // التحقق من الجملة بعد إسقاط الكلمة
    });
});

function playWordSound(word) {
    let sound;
   switch (word) {
        case 'Nice':
            sound = 'nice.mp3';
            break;
        case 'To':
            sound = 'too.mp3';
            break;
        case 'Meet':
            sound = 'meet.mp3';
            break;
        case 'You':
            sound = 'you.mp3';
            break;
        case 'you':
            sound = 'you new.mp3';
            break;
        case 'Too':
            sound = 'newtoo.mp3';
            break;
        case 'This':
            sound = 'this.mp3';
            break;
        case 'is':
            sound = 'is.mp3';
            break;
        case 'My':
            sound = 'my.mp3';
            break;
        case 'Brother':
            sound = 'brother.mp3';
            break;
        case 'Jack':
            sound = 'endjack.mp3';
            break;
    }
    if (sound) {
        const correctSound = new Audio(sound);
        correctSound.play();
    }
}

    // معالجة إسقاط الكلمة في المستطيل الصحيح
    function handleDrop(event, index) {
        const word = event.dataTransfer.getData("button");
        const buttonId = event.dataTransfer.getData("buttonElementId");
    
        if (currentGame.correctSentence[index] === word) {
            dropzone.textContent = word; // وضع الكلمة في المستطيل الصحيح
            sentence[index] = word; // حفظ الكلمة في الجملة
    
            // إخفاء الزر من مكانه السابق
            const buttonToHide = document.getElementById(buttonId);
            if (buttonToHide) {
                buttonToHide.style.display = 'none'; // إخفاء الزر
            }
    
            // تشغيل الصوت عند إسقاط الكلمة الصحيحة في المكان الصحيح
            const correctSound = new Audio('ممتاز.mp3');
            correctSound.play();
        } else {
            const wrongSound = new Audio('wrongg.mp3');
            wrongSound.play();
        }
    
        checkWordGameAnswer(); // التحقق من الجملة بعد إسقاط الكلمة
    }
        
    
    // تغيير الخلفية بناءً على السؤال الحالي
    
    console.log(counter);
}

        // التحقق من ترتيب الجملة
        function checkWordGameAnswer() {
            const feedback = document.getElementById('feedback-word-game');
            const currentGame = wordGameQuestions[currentWordGameQuestion];
        
            if (sentence.length === currentGame.correctSentence.length) {
                if (sentence.join(" ") === currentGame.correctSentence.join(" ")) {
                    var audio = document.getElementById('audio');
                    audio.play();
                    counter++;
                    document.getElementById('score2').innerText = counter;
                    startCelebration();  // استدعاء وظيفة الكونفيتي عند الإجابة الصحيحة
        setTimeout(() => {
            nextWordQuestion(); // الانتقال إلى السؤال التالي
        }, 2000); //
                    
                } else {
                    var rong = document.getElementById('rong');
                    rong.play();
        
                    // إعادة المحاولة تلقائيًا
                    setTimeout(() => {
                        resetWordGame(); // إعادة ضبط اللعبة بعد فترة قصيرة
                    }, 1000); // تأخير لمدة ثانية قبل إعادة المحاولة
                    counter--;
                    document.getElementById('score2').innerText = counter;
                   
                }
            }
        }
        
        function resetWordGame() {
            // إعادة تعيين الجملة المؤقتة
            sentence = [];
            sentenceElement.textContent = "";
        
            // إعادة تفعيل الأزرار
            const buttons = buttonsContainer.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false; // تفعيل الأزرار
            }
        
            // مسح الفيدباك
            document.getElementById('feedback-word-game').innerText = '';
        }

        // تحميل لعبة اختيار أفراد العائلة
        function loadQuestion() {
            const question = questions[currentQuestion];
        
            // تغيير الخلفية بناءً على السؤال الحالي
            document.body.style.backgroundImage = question.background;
            document.getElementById('score').innerText = counter;
            document.getElementById('question').innerText = question.question;
        
            // تشغيل صوت السؤال مرتين عند تحميل السؤال
            playSoundForQuestion(question.question);
        
            const buttons = document.querySelectorAll('#options button');
        
            // تحديث الأزرار وتحميل الخيارات مع تشغيل الصوت عند النقر
            buttons.forEach((button, index) => {
                button.innerText = question.options[index];
        
                // إضافة مستمع للأحداث لتشغيل الصوت والتحقق من الإجابة عند النقر على الزر
                button.onclick = () => {
                    playSound(question.options[index]);  // تشغيل الصوت المرتبط بالخيار
                    checkAnswer(question.options[index]); // التحقق من الإجابة
                };
            });
        
            document.getElementById('feedback').innerHTML = '';
        }
        
        // دالة لتشغيل صوت السؤال مرتين
        function playSoundForQuestion(questionText) {
            const audioSrc = sounds[questionText]; 
            if (audioSrc) {
                const audio = new Audio(audioSrc); // إنشاء كائن الصوت مرة واحدة
        
                // تشغيل الصوت مرتين بفاصل زمني 1 ثانية
                audio.play().then(() => {
                    setTimeout(() => {
                        const audioSecondPlay = new Audio(audioSrc); 
                        audioSecondPlay.play(); // تشغيل الصوت 
                    }, 1000); // تشغيل الصوت مرة ثانية بعد ثانية
                }).catch(error => {
                    console.error('حدث خطأ أثناء تشغيل صوت السؤال:', error);
                });
            } else {
                console.log(`لا يوجد ملف صوت لهذا السؤال: ${questionText}`);
            }
        }
        
let correctSound;

function checkAnswer(answer) {
    const question = questions[currentQuestion];
    const feedback = document.getElementById('feedback');

    if (answer === question.correct) {
       

     
        if (correctSound) {
            correctSound.pause();
            correctSound.currentTime = 0; // إعادة تعيين الصوت إلى البداية
        }

        // تشغيل الصوت الجديد
        correctSound = new Audio('claps-44774.mp3'); 
        correctSound.play();

        startCelebration();  // استدعاء وظيفة الكونفيتي عند الإجابة الصحيحة

        counter++;
        document.getElementById('score').innerText = counter;

        setTimeout(() => {
            nextQuestion(); // الانتقال إلى السؤال التالي
        }, 2000); // 
    }

 else {
                
                var rong = document.getElementById('rong');
                rong.play();
                counter--;
                document.getElementById('score').innerText = counter;
            }
        }

        function nextQuestion() {
            const overlay = document.getElementById('color-overlay');
            const gameContent = document.getElementById('game-content');
        
            
        
            setTimeout(() => {
                currentQuestion++;
        
                if (currentQuestion < questions.length) {
                    // إذا كان هناك صوت قيد التشغيل، قم بإيقافه
                    if (correctSound) {
                        correctSound.pause();
                        correctSound.currentTime = 0; // إعادة تعيين الصوت إلى البداية
                    }
        
                    loadQuestion(); // تحميل السؤال الجديد
                    
                } else {
                    // إخفاء اللعبة الأولى
                    gameContent.style.display = 'none';
                    
                    // إظهار صفحة مؤقتة مع جملة وصوت وتوسيطها
                    const tempPage = document.createElement('div');
                    tempPage.innerHTML = `
                        <div class="centered-message">
                            <h1 class="spicy-rice-regularrr"> Drag the words <br> into the correct<br> place to form <br> the sentence</h1>
                            <audio id="transition-audio" autoplay>
                                <source src="soundto.mp3" type="audio/mpeg">
                            </audio>
                        </div>
                    `;
                    document.body.appendChild(tempPage);
        
                    const audio = document.getElementById('transition-audio');
        
                    // الانتقال إلى السؤال التالي بعد انتهاء الصوت
                    audio.onended = function () {
                        tempPage.remove(); // إزالة الصفحة المؤقتة
                        document.getElementById('word-game').style.display = 'block';
                        loadWordGame(); // تحميل لعبة ترتيب الجملة
                    };
                }
        
                // إخفاء الغطاء بعد فترة
                overlay.style.opacity = '0';
                overlay.style.transform = 'translateX(100%)'; // إرجاع الغطاء إلى اليمين
                setTimeout(() => {
                    overlay.style.display = 'none'; // مخفي بعد الانتهاء
                }, 1000); // مدة الأنيميشن
            }, 3000); // مدة عرض الغطاء
        }
        
        function nextWordQuestion() {
            const wordGameContent = document.getElementById('word-game');
            const overlay = document.getElementById('color-overlay');
            
           
        
            setTimeout(() => {
                currentWordGameQuestion++; // زيادة عداد الأسئلة
                
                if (currentWordGameQuestion < 3) {

                     loadWordGame();
                    
                
                    
                } else {
                   
                    wordGameContent.innerHTML = `
                      
                        <h1 class="spicy-rice-regular">Score: ${counter}</h1>
                        <button id="restart-button" onclick="repeat()" class='endbotton'>Play Again</button>
                        <button id="next-link-button" class='endbotton'>Exit</button>
                    `;
        
                   
                    document.getElementById('restart-button').addEventListener('click', function() {
                        currentWordGameQuestion = 0; // إعادة تعيين عداد الأسئلة
                        counter = 0; // إعادة تعيين النتيجة
                        loadQuestion(); // تحميل أول سؤال
                    });
        
                    
                    document.getElementById('next-link-button').addEventListener('click', function() {
                        window.location.href = 'https://englisheasy.net/dashboard';
                    });
                }
    
            }, 500);
        }

        function repeat(){
            window.location.reload();
        }
        function startCelebration() {
            const canvas = document.getElementById('confettiCanvas');
            const ctx = canvas.getContext('2d');
            const pieces = [];
            const pieceCount = 100;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            function createPiece() {
                return {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 5 + 5,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 + 1,
                    color: `hsl(${Math.random() * 360}, 100%, 30%)`,
                };
            }
        
            for (let i = 0; i < pieceCount; i++) {
                pieces.push(createPiece());
            }
        
            function updateConfetti() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                pieces.forEach(piece => {
                    piece.x += piece.speedX;
                    piece.y += piece.speedY;
                    if (piece.y > canvas.height) {
                        piece.y = 0;
                        piece.x = Math.random() * canvas.width;
                    }
                    ctx.fillStyle = piece.color;
                    ctx.fillRect(piece.x, piece.y, piece.size, piece.size);
                });
            }
        
            // تشغيل الرسوم المتحركة
            const animationDuration = 2700; // مدة الرسوم المتحركة بالمللي ثانية (2 ثانية)
            const startTime = performance.now();
        
            function animate() {
                updateConfetti();
                if (performance.now() - startTime < animationDuration) {
                    requestAnimationFrame(animate);
                } else {
                    console.log("Celebration ended!");
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // مسح الكونفيتي بعد الانتهاء
                }
            }
        
            animate(); // بدء الرسوم المتحركة
        }
        
        
                
        
        // تحميل السؤال الأول عند بداية اللعبة
        loadQuestion();
        
        
