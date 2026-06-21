const fs = require('fs');
const file = 'd:/PORTFOLIO/index.html';
const content = fs.readFileSync(file, 'utf8');

// It seems lines 597-614 were removed and replaced with a tiny snippet.
// Let's restore the end of the file.

const closingTags = `    <footer>
        <div class="container">
            <p>&copy; 2024 Kannan Selvam. Built with passion and code.</p>
        </div>
    </footer>

    <!-- Certificate Modal -->
    <div id="certModal" class="modal-overlay">
        <div class="glass-card modal-content" style="max-width: 700px; padding: 2rem; width: 95%;">
            <span class="close-btn">&times;</span>
            <div class="modal-body" style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                <h3 id="modal-title" style="margin-bottom: 1rem;"></h3>
                <div id="modal-image-container" style="width: 100%; margin-bottom: 1.5rem; display: flex; justify-content: center; align-items: center; position: relative;">
                    <button id="modal-prev-btn" style="display: none; position: absolute; left: 0; top: 50%; transform: translateY(-50%); background: var(--primary-color); color: #000; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 10;"><i class="fas fa-chevron-left"></i></button>
                    <img id="modal-cert-image" src="cert-placeholder.png" alt="Certificate" style="max-width: 100%; max-height: 60vh; border-radius: 12px; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 1px solid var(--glass-border); transition: transform 0.3s ease;">
                    <button id="modal-next-btn" style="display: none; position: absolute; right: 0; top: 50%; transform: translateY(-50%); background: var(--primary-color); color: #000; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; z-index: 10;"><i class="fas fa-chevron-right"></i></button>
                </div>
                <a id="modal-linkedin-btn" href="#" target="_blank" class="neon-social-btn" style="margin-top: 1rem; width: 50px; height: 50px; font-size: 1.5rem;" title="View on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"></script>
    <script src="script.js"></script>
</body>
</html>`;

// Let's truncate the file at </main> and append the closing tags.
const mainEndIndex = content.indexOf('</main>');
if (mainEndIndex !== -1) {
    const fixedContent = content.substring(0, mainEndIndex + 7) + '\n\n' + closingTags;
    fs.writeFileSync(file, fixedContent, 'utf8');
    console.log('Fixed index.html ending successfully');
} else {
    console.log('Could not find </main>');
}
