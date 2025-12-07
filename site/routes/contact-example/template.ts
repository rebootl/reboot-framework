export default () => `
<main class="pt-20 min-h-screen">
  <!-- Hero -->
  <section class="bg-gray-200 py-20">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-3xl font-bold mb-4">Contact RevampIT</h1>
      <p class="text-gray-600">Have a question or want to get involved? Send us a message and we'll get back to you as soon as possible.</p>
    </div>
  </section>

  <!-- Contact Form -->
  <section class="py-20">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Send us a message</h2>
        <form id="contact-form" class="space-y-6" novalidate>
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input id="name" name="name" type="text" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Your full name" />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <input id="email" name="email" type="email" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="you@example.com" />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea id="message" name="message" rows="6" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" placeholder="Write your message here..."></textarea>
          </div>

          <div class="flex items-center justify-center">
            <button type="submit" class="inline-block bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors">Send Message</button>
            <p id="form-status" class="text-sm text-gray-600" aria-live="polite"></p>
          </div>

          <p class="text-xs text-gray-500">By sending a message you agree that we may use the information to contact you. We won't share your personal data with third parties without consent.</p>
        </form>
      </div>
    </div>
  </section>

  <!-- Map (OpenStreetMap embed) -->
  <section class="py-12">
    <div class="container mx-auto px-4">
       <h2 class="text-2xl font-bold mb-6">Our retail location in Zurich</h2>
       <p class="pb-6">With public transports: Tram 9/14, next to station: Heuried</p>
       <div class="w-full h-[560px] rounded-xl overflow-hidden shadow">
         <iframe
           width="100%"
           height="100%"
           frameborder="0"
           scrolling="no"
           marginheight="0"
           marginwidth="0"
           src="https://www.openstreetmap.org/export/embed.html?bbox=8.5034619%2C47.3675377%2C8.5064619%2C47.3705377&layer=mapnik&marker=47.3690377,8.5049619"
           class="w-full h-full"
         ></iframe>
       </div>
       <p class="text-sm text-gray-600 mt-2"><a href="https://www.openstreetmap.org/?mlat=47.3690377&amp;mlon=8.5049619#map=18/47.3690377/8.5049619" target="_blank" rel="noopener noreferrer" class="text-green-700 underline">View larger map on OpenStreetMap</a></p>
     </div>
   </section>

</main>
`.trim();
