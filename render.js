document.addEventListener("DOMContentLoaded", () => {
    // 1. CSS GIAO DIỆN NÂNG CẤP CAO CẤP
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=gg+sans:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

        :root {
            --bg-base: #17181c;
            --bg-primary: #2b2d31;
            --bg-secondary: #232428;
            --bg-secondary-alt: #1c1d21;
            --bg-hover: rgba(255, 255, 255, 0.035);
            --bg-active: rgba(255, 255, 255, 0.07);

            --text-normal: #dbdee1;
            --text-muted: #949ba4;
            --text-link: #00a8fc;
            --text-header: #ffffff;

            --brand-primary: #5865f2;
            --brand-hover: #4752c4;
            --mention-bg: rgba(88, 101, 242, 0.16);
            --mention-border: rgba(88, 101, 242, 0.45);
            --mention-txt: #c9cdfb;

            --border-subtle: rgba(255, 255, 255, 0.055);
            --border-strong: rgba(255, 255, 255, 0.12);
            --shadow-elevation: 0 6px 16px rgba(0, 0, 0, 0.3);
            --radius-sm: 4px;
            --radius-md: 8px;
            --radius-lg: 14px;
        }

        * { box-sizing: border-box; }

        body {
            background-color: var(--bg-primary);
            color: var(--text-normal);
            font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.4;
            -webkit-font-smoothing: antialiased;
        }

        /* Scrollbar Tinh Tế */
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--bg-base); border-radius: 8px; border: 2px solid var(--bg-primary); }
        ::-webkit-scrollbar-thumb:hover { background: #0e0f11; }

        /* Header Hiện Đại VớI Glassmorphism */
        #header {
            padding: 18px 28px;
            background: rgba(35, 36, 40, 0.82);
            backdrop-filter: blur(14px) saturate(150%);
            -webkit-backdrop-filter: blur(14px) saturate(150%);
            border-bottom: 1px solid var(--border-subtle);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 14px rgba(0,0,0,0.2);
        }
        .header-content {
            max-width: 1100px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .channel-name {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-header);
            display: flex;
            align-items: center;
            gap: 8px;
            letter-spacing: -0.01em;
        }
        .channel-hashtag { color: var(--text-muted); font-size: 1.4rem; font-weight: 500; }
        .topic {
            color: var(--text-muted);
            font-size: 0.85rem;
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: wrap;
        }
        .close-reason {
            background: rgba(242, 63, 67, 0.12);
            color: #f23f43;
            border: 1px solid rgba(242, 63, 67, 0.25);
            padding: 2px 9px;
            border-radius: 20px;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.2px;
        }

        /* Chat Container Layout */
        #chat-container {
            padding: 24px 0 48px;
            max-width: 1100px;
            margin: 0 auto;
        }

        /* Tin Nhắn Khung Nhóm (Message Group) */
        .msg-group {
            display: flex;
            padding: 8px 18px;
            margin-top: 18px;
            border-radius: var(--radius-md);
            transition: background-color 0.15s ease;
        }
        .msg-chained {
            display: flex;
            padding: 2px 18px 2px 74px;
            position: relative;
            border-radius: var(--radius-md);
            transition: background-color 0.15s ease;
        }
        .msg-group:hover, .msg-chained:hover {
            background-color: var(--bg-hover);
        }

        /* Avatar & User Details */
        .avatar {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-right: 16px;
            flex-shrink: 0;
            cursor: pointer;
            object-fit: cover;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .avatar:hover { transform: scale(1.06); box-shadow: 0 3px 8px rgba(0,0,0,0.4); }

        .msg-wrapper { flex: 1; min-width: 0; }

        .msg-header {
            display: flex;
            align-items: baseline;
            margin-bottom: 4px;
            gap: 9px;
        }
        .username {
            font-weight: 600;
            font-size: 0.99rem;
            cursor: pointer;
            letter-spacing: -0.005em;
        }
        .username:hover { text-decoration: underline; }

        .bot-tag {
            background: linear-gradient(135deg, var(--brand-primary), var(--brand-hover));
            color: white;
            font-size: 0.58rem;
            padding: 1.5px 5px;
            border-radius: 3px;
            font-weight: 700;
            letter-spacing: 0.4px;
            display: inline-flex;
            align-items: center;
            height: 15px;
        }
        .timestamp {
            font-size: 0.7rem;
            color: var(--text-muted);
            font-weight: 500;
        }

        /* Message Text & Inline Formatting */
        .msg-content {
            font-size: 0.9375rem;
            color: var(--text-normal);
            white-space: pre-wrap;
            word-break: break-word;
        }
        .time-hover {
            display: none;
            position: absolute;
            left: 18px;
            width: 42px;
            text-align: right;
            font-size: 0.675rem;
            color: var(--text-muted);
            line-height: 1.4;
            user-select: none;
        }
        .msg-chained:hover .time-hover { display: block; }

        .mention {
            background-color: var(--mention-bg);
            color: var(--mention-txt);
            border-bottom: 1px solid var(--mention-border);
            padding: 0 4px;
            border-radius: 3px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.15s ease;
        }
        .mention:hover {
            background-color: var(--brand-primary);
            color: #ffffff;
            border-bottom-color: transparent;
        }

        /* Inline Code & Codeblocks */
        pre code {
            display: block;
            background: var(--bg-secondary-alt);
            padding: 12px 16px;
            border-radius: var(--radius-md);
            border: 1px solid var(--border-subtle);
            font-family: 'Fira Code', monospace;
            font-size: 0.85rem;
            color: #e3e5e8;
            overflow-x: auto;
            margin-top: 6px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);
        }

        /* Embeds Chuyên Nghiệp */
        .embed {
            background-color: var(--bg-secondary);
            border-left: 4px solid var(--border-strong);
            border-radius: var(--radius-sm) var(--radius-md) var(--radius-md) var(--radius-sm);
            padding: 14px 18px;
            margin-top: 8px;
            max-width: 520px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .embed:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-elevation);
        }
        .embed-title { font-weight: 700; color: var(--text-header); margin-bottom: 6px; font-size: 0.96rem; }
        .embed-desc { font-size: 0.875rem; color: var(--text-normal); white-space: pre-wrap; line-height: 1.45; }

        /* Image & File Attachments */
        .attach-img {
            max-width: 100%;
            max-height: 380px;
            border-radius: var(--radius-md);
            margin-top: 8px;
            cursor: pointer;
            transition: transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease;
            display: block;
            box-shadow: 0 3px 10px rgba(0,0,0,0.25);
        }
        .attach-img:hover {
            transform: scale(1.012);
            filter: brightness(1.06);
            box-shadow: 0 6px 18px rgba(0,0,0,0.35);
        }

        .attach-file {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin-top: 8px;
            padding: 11px 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-md);
            color: var(--text-link);
            text-decoration: none;
            font-size: 0.875rem;
            font-weight: 500;
            transition: all 0.2s ease;
        }
        .attach-file:hover {
            background: var(--bg-secondary-alt);
            border-color: var(--border-strong);
            transform: translateY(-1px);
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);

    // 2. NHẬN DỮ LIỆU
    const rawData = document.getElementById('transcript-data')?.textContent || '{}';
    const data = JSON.parse(rawData);

    // 3. RENDER HEADER
    const headerElement = document.createElement('div');
    headerElement.id = 'header';
    headerElement.innerHTML = `
        <div class="header-content">
            <div class="channel-name">
                <span class="channel-hashtag">#</span>${data.channelName || 'transcript'}
            </div>
            <div class="topic">
                ${data.topic ? `<span>${data.topic}</span> <span>•</span>` : ''} 
                <span>Đóng vào: ${data.exportedAt || 'N/A'}</span>
                ${data.closeReason ? `<span class="close-reason">Đã đóng: ${data.closeReason}</span>` : ''}
            </div>
        </div>
    `;
    document.body.appendChild(headerElement);

    const chatContainer = document.createElement('div');
    chatContainer.id = 'chat-container';
    document.body.appendChild(chatContainer);

    // 4. PARSER NỘI DUNG (Hỗ trợ Mention + Codeblock cơ bản)
    const formatContent = (text, mentions) => {
        if (!text) return '';
        let formatted = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        // Render Code block (```code```)
        formatted = formatted.replace(/```(?:[a-z]*\n)?([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        
        // Render Mention (@User)
        if (mentions?.length) {
            mentions.forEach(m => {
                const regex = new RegExp(`&lt;@!?&?${m.id}&gt;`, 'g');
                formatted = formatted.replace(regex, `<span class="mention">@${m.name}</span>`);
            });
        }
        return formatted;
    };

    // 5. RENDER DANH SÁCH TIN NHẮN
    let currentHtml = '';
    let lastAuthorId = null;
    let lastTimestamp = 0;

    (data.messages || []).forEach(msg => {
        const contentHtml = formatContent(msg.content, msg.mentions);

        const embedsHtml = (msg.embeds || []).map(e => `
            <div class="embed" style="${e.color ? `border-left-color: ${e.color}` : ''}">
                ${e.title ? `<div class="embed-title">${e.title}</div>` : ''}
                ${e.description ? `<div class="embed-desc">${formatContent(e.description, [])}</div>` : ''}
            </div>
        `).join('');

        const attachHtml = (msg.attachments || []).map(a => {
            if (a.isImage) return `<div><img src="${a.url}" class="attach-img" alt="Attachment" loading="lazy"></div>`;
            return `<div><a href="${a.url}" class="attach-file" target="_blank" rel="noopener noreferrer">📌 ${a.name || 'Tệp đính kèm'}</a></div>`;
        }).join('');

        // Gom nhóm tin nhắn gửi gần nhau (trong vòng 5 phút)
        const isChained = (lastAuthorId === msg.author.id) && (msg.rawTimestamp - lastTimestamp < 300000);

        if (isChained) {
            const timeOnly = new Date(msg.rawTimestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            currentHtml += `
                <div class="msg-chained">
                    <span class="time-hover">${timeOnly}</span>
                    <div class="msg-wrapper">
                        ${contentHtml ? `<div class="msg-content">${contentHtml}</div>` : ''}
                        ${embedsHtml}
                        ${attachHtml}
                    </div>
                </div>
            `;
        } else {
            currentHtml += `
                <div class="msg-group">
                    <img src="${msg.author.avatar}" class="avatar" alt="Avatar" loading="lazy">
                    <div class="msg-wrapper">
                        <div class="msg-header">
                            <span class="username" style="color: ${msg.author.color || '#ffffff'}">${msg.author.username}</span>
                            ${msg.author.bot ? '<span class="bot-tag">APP</span>' : ''}
                            <span class="timestamp">${msg.timestamp}</span>
                        </div>
                        ${contentHtml ? `<div class="msg-content">${contentHtml}</div>` : ''}
                        ${embedsHtml}
                        ${attachHtml}
                    </div>
                </div>
            `;
        }

        lastAuthorId = msg.author.id;
        lastTimestamp = msg.rawTimestamp;
    });

    chatContainer.innerHTML = currentHtml;
});