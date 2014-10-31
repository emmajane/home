
var path = require('path'),
    jade = require('jade'),
    _ = require('lodash');

/**
 * Renders content for the site based on a slug and the site options
 * @param  {String} slug The URL slug to try and render
 * @param  {Object} site The site options
 * @return {String | Error} Returns the string of content on success, an Error object otherwise
 */
module.exports = function (slug, site) {
    var content,
        data = site.pageData[slug] || {};

    data.slug = slug;
    data.template = data.template || site.defaultTemplate || 'base.jade';
    data.title = data.title || site.title || 'My Site - %slug%';

    _.extend(data, {
        renderContent: function() {
            return jade.render(
                'include:markdown ' + path.join(site.contentDir, slug + '.md'),
                { filename: 'FOOBAR' } // this option must be here, but is not used
            );
        }
    });

    data.title = data.title.replace(/%slug%/g, slug.replace(/\-/g, ' ').replace(/\w*/g, function(t){ return t.charAt(0).toUpperCase()+t.substr(1).toLowerCase(); }));

    try {
        content = jade.renderFile(path.join('templates', site.template, data.template), data);
    } catch(e) {
        // We'll send back the error instead of content
        // This seems weird, but the way errors are thrown down in here they 
        // may not otherwise get caught by the Express error handling middleware
        content = e;
    }

    return content;
};