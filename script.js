// Dynamic interactions for ETHANJOH Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect
    const typingText = document.querySelector('.typing-text');
    const words = [
        "방구석 개발자",
        "상상을 빌드하는 풀스택 엔지니어",
        "커피와 버그의 변환기",
        "Cozy Indie Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 120; // Typing speed

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            delay = 50; // Deleting speed
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            delay = 120; // Regular typing speed
        }

        // Handle word completion
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            delay = 2000; // Time to wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 500; // Pause before starting next word
        }

        setTimeout(type, delay);
    }

    // Start typewriter
    if (typingText) {
        type();
    }


    // 2. 2.5D Room Mouse Parallax / Tilt Effect
    const roomWrapper = document.getElementById('room-wrapper');
    const roomPerspective = document.getElementById('room-perspective');

    if (roomWrapper && roomPerspective) {
        roomWrapper.addEventListener('mousemove', (e) => {
            const rect = roomWrapper.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            
            // Mouse coordinate relative to the center of the container (-0.5 to 0.5)
            const mouseX = (e.clientX - rect.left) / width - 0.5;
            const mouseY = (e.clientY - rect.top) / height - 0.5;
            
            // Calculate dynamic rotation angles
            // Base isometric angles: RotateX(15deg) RotateY(-20deg)
            const maxTiltX = 15; // Max additional degrees of tilt
            const maxTiltY = 15;
            
            const rotateX = 15 - (mouseY * maxTiltX);
            const rotateY = -20 + (mouseX * maxTiltY);
            
            roomPerspective.style.setProperty('--rotate-x', `${rotateX}deg`);
            roomPerspective.style.setProperty('--rotate-y', `${rotateY}deg`);
        });

        // Smooth reset when mouse leaves
        roomWrapper.addEventListener('mouseleave', () => {
            roomPerspective.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            roomPerspective.style.setProperty('--rotate-x', '15deg');
            roomPerspective.style.setProperty('--rotate-y', '-20deg');
            
            // Clean up transition after it finishes so movement stays responsive
            setTimeout(() => {
                roomPerspective.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
            }, 800);
        });
    }


    // 3. Theme / Light-Switch Toggle (Matrix Retro Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const btnIcon = themeToggle.querySelector('.btn-icon');
    const btnText = themeToggle.querySelector('.btn-text');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('retro-mode');
            
            const isRetro = document.body.classList.contains('retro-mode');
            if (isRetro) {
                btnIcon.textContent = '⚡';
                btnText.textContent = 'Cozy Mode';
                appendTerminalLine("System setting overridden: RETRO_MODE=active");
            } else {
                btnIcon.textContent = '💡';
                btnText.textContent = 'Light Switch';
                appendTerminalLine("System setting overridden: COZY_MODE=active");
            }
        });
    }


    // 4. Hotspots (Pins) Interactions
    const hotspots = document.querySelectorAll('.hotspot');
    const tooltip = document.getElementById('room-tooltip');

    hotspots.forEach(hotspot => {
        const text = hotspot.getAttribute('data-tip');
        
        // Hover updates tooltip
        hotspot.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.borderColor = 'var(--accent-pink)';
            tooltip.textContent = text;
        });

        hotspot.addEventListener('mouseleave', () => {
            tooltip.style.borderColor = 'var(--accent-purple)';
            tooltip.textContent = '마우스를 움직여 방을 둘러보세요. 핀을 클릭해보세요!';
        });

        // Click writes a log to the dashboard command line
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            let actionName = "";
            if (hotspot.classList.contains('pin-monitor')) {
                actionName = "cat ~/setup_details.log";
                appendTerminalLine("Running: " + actionName);
                setTimeout(() => appendTerminalLine("> Dual Monitors, Mechanical Keyboard, Tea Cup detected."), 300);
            } else if (hotspot.classList.contains('pin-bed')) {
                actionName = "cat ~/sleep_status.json";
                appendTerminalLine("Running: " + actionName);
                setTimeout(() => appendTerminalLine("> { status: 'Sleeping', duration: '3h', caffeine: 'High' }"), 300);
            } else if (hotspot.classList.contains('pin-shelf')) {
                actionName = "ls -la ~/bookshelf";
                appendTerminalLine("Running: " + actionName);
                setTimeout(() => appendTerminalLine("> O'Reilly Books, Gunpla, Retro Handheld Console"), 300);
            } else if (hotspot.classList.contains('pin-window')) {
                actionName = "ping google.com";
                appendTerminalLine("Running: " + actionName);
                setTimeout(() => appendTerminalLine("> Out-of-window scenery is currently offline. Offline mode active."), 300);
            }
        });
    });


    // Helper to log commands inside the terminal dashboard card
    function appendTerminalLine(text) {
        const terminalBody = document.querySelector('.card-body');
        if (!terminalBody) return;

        // Create new command log element
        const logLine = document.createElement('div');
        logLine.className = 'terminal-command';
        logLine.style.animation = 'fadeIn 0.3s ease forwards';
        logLine.innerHTML = `<span class="prompt">$</span> <span class="cmd-run" style="color:var(--accent-cyan)">${text}</span>`;
        
        // Check if there are already extra lines, keep it neat
        const lines = terminalBody.querySelectorAll('.terminal-command');
        if (lines.length > 3) {
            lines[0].remove();
        }

        terminalBody.appendChild(logLine);
    }


    // 5. Ping Button / Door knock
    const pingBtn = document.getElementById('ping-btn');
    const customAlert = document.getElementById('custom-alert');

    if (pingBtn && customAlert) {
        pingBtn.addEventListener('click', () => {
            // Trigger animation
            customAlert.classList.add('show');
            appendTerminalLine("ping -c 1 ethanjoh_brain");
            
            setTimeout(() => {
                appendTerminalLine("> Response: 64 bytes from ethanjoh: icmp_seq=1 ttl=64 time=0.04ms (focusing...)");
            }, 400);

            // Hide alert after 3 seconds
            setTimeout(() => {
                customAlert.classList.remove('show');
            }, 3000);
        });
    }
});
