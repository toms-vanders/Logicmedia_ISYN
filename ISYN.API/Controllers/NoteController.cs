﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISYN.DataAccess;
using ISYN.DataAccess.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ISYN.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> GetAllNotes()
        {
            NoteDataAccess data = new NoteDataAccess();

            return data.GetAllNotes();
        }

        [HttpGet("{content}")]
        public IEnumerable<Note> GetAllNotes(string content)
        {
            NoteDataAccess data = new NoteDataAccess();

            return data.GetNotes(content);
        }

        [HttpPost("insert")]
        public bool InsertNote([FromBody ] Note note)
        {
            NoteDataAccess data = new NoteDataAccess();

            if (data.InsertNote(note.Content))
            {
                return true;
                
            }
            return false;
        }

        [HttpPut]
        public bool UpdateNote(string noteId)
        {
            NoteDataAccess data = new NoteDataAccess();

            if (data.UpdateNote(noteId))
            {
                return true;
            }
            return false;
        }

        [HttpGet("sayt/{content}")]
        public IEnumerable<string> SearchAsYouType(string content)
        {
            NoteDataAccess data = new NoteDataAccess();

            return data.SearchAsYouType(content);
        }
    }
}
