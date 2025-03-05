export default function ContactMap() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-indigo-100">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Our Location</h2>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.180092381908!2d91.88857377529746!3d24.89183794400139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751ab346896002f%3A0xbebd297f94cd51de!2sClassic%20School%20and%20College!5e0!3m2!1sen!2sbd!4v1738787845301!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
      
      <div className="mt-4 text-gray-600">
        <p>Block-D, Main Road</p>
        <p>Shahjalal Upashahar, Sylhet</p>
        <p>Bangladesh</p>
      </div>
    </div>
  )
}

