/*
 * Second Home Car Wash - static-site fixes for leftover WordPress widgets.
 * The site is served as static files, so anything that used to POST to
 * WordPress (sticky "Enquire Now" form, blog comments, search) did nothing.
 * These handlers route them to WhatsApp or to the matching page instead.
 */
(function () {
    'use strict';

    var WHATSAPP_NUMBER = '918801939500';

    function openWhatsApp(text) {
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
        var win = window.open(url, '_blank');
        // Popup blocked (common in in-app browsers): open WhatsApp in this tab instead
        if (!win) {
            window.location.href = url;
            return false;
        }
        return true;
    }
    window.shcOpenWhatsApp = openWhatsApp;

    function val(form, selector) {
        var el = form.querySelector(selector);
        return el ? el.value.trim() : '';
    }

    function showNote(form, message) {
        var note = document.createElement('p');
        note.className = 'shc-form-note';
        note.textContent = message;
        note.style.cssText = 'margin:12px 0 0;font-weight:600;color:#0f7a59;';
        form.parentNode.insertBefore(note, form.nextSibling);
        form.style.display = 'none';
    }

    /* Sticky "Enquire Now" form: its plugin posted to /wp-admin/admin-ajax.php (gone) */
    function handleStickyForm(form) {
        var lines = ['Hello Second Home Car Wash! I have an enquiry:', ''];
        var name = val(form, '#contact-form-name');
        if (name) lines.push('*Name:* ' + name);
        lines.push('*Phone:* ' + val(form, '#contact-form-phone'));
        lines.push('*Email:* ' + val(form, '#contact-form-email'));
        var message = val(form, '#contact-form-message');
        if (message) lines.push('*Message:* ' + message);
        lines.push('*Page:* ' + window.location.pathname);

        if (openWhatsApp(lines.join('\n'))) {
            var status = form.querySelector('#mse-form-error');
            if (status) {
                status.textContent = 'Thank you! Your enquiry is ready to send on WhatsApp.';
                status.style.display = 'block';
                status.style.color = '#0f7a59';
            }
            form.reset();
        }
    }

    /* Blog comment forms: used to post to /wp-comments-post.php (gone) */
    function handleCommentForm(form) {
        var title = document.title.split('|')[0].trim();
        var text = 'Hello Second Home Car Wash! A comment on "' + title + '":\n\n' +
            '*Name:* ' + val(form, '#author') + '\n' +
            '*Email:* ' + val(form, '#email') + '\n' +
            '*Comment:* ' + val(form, '#comment');
        if (openWhatsApp(text)) {
            showNote(form, 'Thank you! Your comment is ready to send on WhatsApp.');
        }
    }

    /* Site search: there is no search backend, so jump to the best matching page */
    var PAGES = [
        { url: '/packages/', words: 'package packages plan plans price prices pricing cost rate subscription daily alternate hatchback sedan suv suvs mid luxury convertible book booking' },
        { url: '/services/', words: 'service services cleaning wash interior exterior tyre shine polish waterless banjara hills' },
        { url: '/about/', words: 'about us team founder founders ravikanth kiran company who' },
        { url: '/news/', words: 'news blog blogs article articles update updates latest' },
        { url: '/car-care-tips/', words: 'tip tips care season seasonal maintenance' },
        { url: '/car-colors/', words: 'colour colours color colors paint unique' },
        { url: '/tyre-inspection/', words: 'tyre tyres tire tires pothole inspect inspection' },
        { url: '/waterless-benefits/', words: 'used car buying buy 2025 waterless benefits' },
        { url: '/privacy/', words: 'privacy policy data cookies' },
        { url: '/', words: 'home contact enquiry inquiry phone whatsapp email location timings' }
    ];

    function handleSearch(form) {
        var input = form.querySelector('input[name="s"]');
        var query = input ? input.value.toLowerCase() : '';
        var terms = query.split(/[^a-z0-9]+/).filter(function (t) { return t.length > 1; });
        if (!terms.length) return;

        var best = null, bestScore = 0;
        PAGES.forEach(function (page) {
            var words = page.words.split(' ');
            var score = terms.filter(function (t) {
                return words.some(function (w) { return w === t || (t.length > 3 && w.indexOf(t) === 0); });
            }).length;
            if (score > bestScore) { best = page; bestScore = score; }
        });
        window.location.href = best ? best.url : '/news/';
    }

    // Capture phase so these run before (and instead of) the old plugin handlers
    document.addEventListener('submit', function (e) {
        var form = e.target;
        var handler = null;
        if (form.id === 'stickyelements-form') handler = handleStickyForm;
        else if (form.id === 'commentform') handler = handleCommentForm;
        else if (form.classList.contains('rmp-search-form') || form.classList.contains('searchform')) handler = handleSearch;
        if (!handler) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        if (handler !== handleSearch && !form.reportValidity()) return;
        handler(form);
    }, true);
})();
