const Contact = () => {
  return (
    <div className=" p-4 m-4">
      <h1 className="text-lg font-bold">Contact page</h1>
      <form>
        <input
          type="text"
          placeholder="name"
          className="p-2 m-2 border border-black rounded-lg"
        />
        <input
          type="text"
          placeholder="age"
          className="p-2 m-2 border border-black rounded-lg"
        />
        <button
          type="submit"
          className="p-2 m-2 border border-black rounded-lg bg-slate-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
