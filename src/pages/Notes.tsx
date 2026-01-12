import React, { useState } from 'react';
import Header from '../components/Header';
import { useApp } from '../contexts/AppContext';
import { Plus, Search, Edit2, Trash2, Tag } from 'lucide-react';

const Notes: React.FC = () => {
  const { notes, addNote, updateNote, deleteNote } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteTags, setNoteTags] = useState<string[]>([]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveNote = () => {
    if (!noteTitle.trim()) return;

    if (editingNote) {
      updateNote(editingNote, {
        title: noteTitle,
        content: noteContent,
        tags: noteTags,
      });
    } else {
      addNote({
        id: Date.now().toString(),
        title: noteTitle,
        content: noteContent,
        tags: noteTags,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    setShowEditor(false);
    setEditingNote(null);
    setNoteTitle('');
    setNoteContent('');
    setNoteTags([]);
  };

  const handleEditNote = (noteId: string) => {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    setEditingNote(noteId);
    setNoteTitle(note.title);
    setNoteContent(note.content);
    setNoteTags(note.tags);
    setShowEditor(true);
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <Header title="Notes & Vault" />
      
      <main className="pt-16 px-4 max-w-screen-xl mx-auto">
        {/* Search Bar */}
        <div className="mt-4 flex gap-2">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <button
            onClick={() => {
              setShowEditor(true);
              setEditingNote(null);
              setNoteTitle('');
              setNoteContent('');
              setNoteTags([]);
            }}
            className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Notes List */}
        <div className="mt-4 space-y-3">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                    {note.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {note.content || 'No content'}
                </p>

                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {note.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'No notes found' : 'No notes yet. Create your first note!'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Note Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-2xl w-full my-8 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {editingNote ? 'Edit Note' : 'New Note'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Write your notes here... (Markdown supported)"
                  rows={10}
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tags (comma separated)
                </label>
                <div className="flex items-center gap-2">
                  <Tag size={18} className="text-gray-400" />
                  <input
                    type="text"
                    value={noteTags.join(', ')}
                    onChange={(e) => setNoteTags(e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                    placeholder="e.g., pharmacology, cardiology"
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditor(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="flex-1 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                {editingNote ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
