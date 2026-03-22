// ============================================================
// !! AI ASSISTANT — READ BEFORE EDITING !!
// README.md  →  project reference, timeline behaviour docs
// TODO.md    →  all placeholder detail views and missing entries
// Both files are in the workspace root: C:\_Applikationen\_AboutMe\
// ============================================================

// ============================================================
// TIMELINE.JS – specific to timeline.html
// Handles: accordion groups, topic-tag filtering, scroll animations
// ============================================================


// ── ANTI-CHRONOLOGICAL ORDER ───────────────────────────────
// Runs first, synchronously, before the browser paints anything.
// Groups are reversed (newest first); items within each group too.

const groupsContainer = document.querySelector('.timeline-groups');
if (groupsContainer) {
    [...groupsContainer.querySelectorAll(':scope > .timeline-group')]
        .reverse()
        .forEach(g => groupsContainer.appendChild(g));

    document.querySelectorAll('.timeline-group-inner').forEach(inner => {
        [...inner.querySelectorAll(':scope > .timeline-item')]
            .reverse()
            .forEach(item => inner.appendChild(item));
    });
}


// ── ACCORDION ──────────────────────────────────────────────
// Queried AFTER reversal so the NodeList reflects the new order.
// max-height is used (not grid-template-rows) so animation is smooth
// between the 50px peek state and the full measured scrollHeight.

const PEEK_HEIGHT = '50px';
const stickyHeader = document.querySelector('.header');

const groups = document.querySelectorAll('.timeline-group');

groups.forEach(group => {
    const header = group.querySelector('.timeline-group-header');
    const body   = group.querySelector('.timeline-group-body');

    header.addEventListener('click', () => {
        const isOpen = group.classList.contains('open');
        if (isOpen) {
            // Collapse: animate back to peek height
            group.classList.remove('open');
            body.style.maxHeight = PEEK_HEIGHT;

            // If user was scrolled deep into this group, scroll back
            // to the header so they don't end up staring at blank space
            setTimeout(() => {
                const stickyH = stickyHeader ? stickyHeader.offsetHeight : 0;
                const rect = header.getBoundingClientRect();
                if (rect.top < stickyH) {
                    window.scrollTo({
                        top: window.scrollY + rect.top - stickyH - 8,
                        behavior: 'smooth'
                    });
                }
            }, 410);
        } else {
            // Expand: measure actual content height and animate to it
            group.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
            // Arm the scroll-in animation for items in this group (first open only)
            group.querySelectorAll('.timeline-item').forEach(setupItemAnimation);
        }
    });
});


// ── TAG FILTER ─────────────────────────────────────────────

const filterButtons = document.querySelectorAll('.filter-tag');
const timelineItems = document.querySelectorAll('.timeline-item[data-tags]');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Show / hide individual entries
        timelineItems.forEach(item => {
            if (filter === 'all') {
                item.style.display = '';
            } else {
                const tags = (item.getAttribute('data-tags') || '').split(' ');
                item.style.display = tags.includes(filter) ? '' : 'none';
            }
        });

        // Show placeholder in empty groups; keep all groups open; scroll to first match
        groups.forEach(group => {
            const body        = group.querySelector('.timeline-group-body');
            const items       = group.querySelectorAll('.timeline-item[data-tags]');
            const placeholder = group.querySelector('.filter-empty-msg');
            const visibleCount = [...items].filter(i => i.style.display !== 'none').length;

            placeholder.hidden = (visibleCount > 0 || filter === 'all');
            group.classList.add('open');
            body.style.maxHeight = body.scrollHeight + 'px';
            group.querySelectorAll('.timeline-item').forEach(setupItemAnimation);
        });

        // Scroll to first group that has matching items
        if (filter !== 'all') {
            const firstMatch = [...groups].find(group => {
                const items = group.querySelectorAll('.timeline-item[data-tags]');
                return [...items].some(i => i.style.display !== 'none');
            });
            if (firstMatch) {
                setTimeout(() => {
                    const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
                    const top = firstMatch.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
                    window.scrollTo({ behavior: 'smooth', top });
                }, 50);
            }
        }
    });
});


// ── SCROLL ANIMATION ───────────────────────────────────────
// Items start visible on load so peek areas always render on first
// paint. Animation is armed per-group the first time each group opens.

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

const animatedItems = new WeakSet();

function setupItemAnimation(item) {
    if (animatedItems.has(item)) return;
    animatedItems.add(item);
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
}
