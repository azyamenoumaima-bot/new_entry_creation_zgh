export function submitEntry(wikitext, summary) {

  \\ Verify whether the script is running inside MediaWiki by checking the global mw object
  
    if (typeof mw === 'undefined') {
        console.warn('Not in MediaWiki environment. Wikitext:\n', wikitext);
        alert('Simulated Save! check the browser console to Wikitext.');
        return;
    }

    const defaultSummary = summary || 'Creation: New entry in Tamazight / ⵜⴰⴳⵔⵜ: ⴰⵙⵏⵓⵍⴼⵓ ⵏ ⵓⵎⴰⴳⵔⴰⴷ';
    const api = new mw.Api();

    return api.postWithToken('csrf', {
        action: 'edit',
        title: mw.config.get('wgPageName'),
        text: wikitext,
        summary: defaultSummary,
        createonly: true // Prevents overwriting if the page already exists
    }).done(function(data) {
        console.log("Saved successfully!", data);
        location.reload(); 
    }).fail(function(code, data) {
        console.error("API Error: " , code, data);
        alert('Failed to save entry: ' + code);
    });
}
