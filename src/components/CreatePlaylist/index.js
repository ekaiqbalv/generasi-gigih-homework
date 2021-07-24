import "./style.css";

const CreatePlaylist = ({
  handleInputCreatePlaylist,
  handleSubmitFormCreatePlaylist,
}) => {
  return (
    <div className="create-playlist">
      <h2 className="create-playlist-title">Create Playlist</h2>
      <form onSubmit={handleSubmitFormCreatePlaylist}>
        <div className="create-playlist-input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            minLength="10"
            onChange={handleInputCreatePlaylist}
            placeholder="Add a title"
            required
          />
        </div>
        <div className="create-playlist-input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            minLength="20"
            rows="4"
            onChange={handleInputCreatePlaylist}
            placeholder="Add a description"
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePlaylist;
