// ============================================================
// TIMELINE.JS – specific to timeline.html
// Handles: accordion groups, topic-tag filtering, scroll animations
// ============================================================

// ── ACCORDION ──────────────────────────────────────────────

const groups = document.querySelectorAll('.timeline-group');

groups.forEach(group => {
    const header = group.querySelector('.timeline-group-header');
    const body   = group.querySelector('.timeline-group-body');

    // All groups start open
    group.classList.add('open');

    header.addEventListener('click', () => {
        const isOpen = group.classList.contains('open');
        if (isOpen) {
            group.classList.remove('open');
            body.classList.add('collapsed');
        } else {
            group.classList.add('open');
            body.classList.remove('collapsed');
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

        // Auto-collapse groups that have no visible entries; expand those that do
        groups.forEach(group => {
            const body  = group.querySelector('.timeline-group-body');
            const items = group.querySelectorAll('.timeline-item[data-tags]');
            const visibleCount = [...items].filter(i => i.style.display !== 'none').length;

            if (visibleCount === 0 && filter !== 'all') {
                group.classList.remove('open');
                body.classList.add('collapsed');
            } else {
                group.classList.add('open');
                body.classList.remove('collapsed');
            }
        });
    });
});


// ── SCROLL ANIMATION ───────────────────────────────────────

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

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});
