## Website Editor Tool (via Static Website Generator /w CMS)

An example on how to use Netlify CMS to create a customizable landing page

[Demo Link](https://gatsby-starter-netlify-cms-landing-page.netlify.com/) (You can even make edits to hte demo [here](https://gatsby-starter-netlify-cms-landing-page.netlify.com/admin), just log in with your Github/Google account)

### What this includes
A simple landing page with several sections that can be edited, rearranged, and removed with the Netlify CMS

### How to Use
Make sure you've nodejs and [gatsby-cli](https://www.gatsbyjs.org/docs/gatsby-cli/) installed.

Open your terminal of choice and run:

```gatsby new my-new-project https://github.com/Mohcka/gatsby-starter-netlify-cms-landing-page.git```

Once everything is installed, go into the created directory and run `npm run develop` and open your browser to `localhost:8000`

To test a production build run `npm run build && npm run serve` and go to `localhost:9000` to see the results

### Launching

When you're ready to deploy to netlify, please follow [this guide](https://www.gatsbyjs.org/docs/deploying-to-netlify/) to launch your site 

Once launched, you can then head over to `your-page.netlify.com` to view the live page.  

To make edits, first make sure you've [setup authentication](https://www.netlifycms.org/docs/add-to-your-site/#setup-on-netlify) then go to `your-page.netlify.com/admin`.  You will see two tabs on the left "Landing Page" and "Settings".  Landing Page is where you'll enter the information for the sections and carousel.  The Settings allows you to change the primary color theme of the website, make changes to the contact information and social media links, as well as embed custom css and javascript if you need to do so on the CMS.  

Check out the [docs](https://www.netlifycms.org/docs/intro/) for more information on working with Netlify CMS.
