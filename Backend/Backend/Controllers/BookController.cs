using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace Backend.Controllers;

    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]   // POST /api/book
        public async Task<IActionResult> AddBook(Book book)
        {
            try
            {
                _context.Book.Add(book);
                await _context.SaveChangesAsync();
                return CreatedAtRoute("GetBook",new{id=book.bookId},book);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]   // GET /api/book
        public async Task<IActionResult> GetBooks()
        {
            try
            {
                var book = await _context.Book.ToListAsync();
                return Ok(book);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{id:int}", Name = "GetBook")]   // GET /api/book/1
        public async Task<IActionResult> GetBook(int id)
        {
            try
            {
                var book = await _context.Book.FindAsync(id);
                if(book is null)
                {
                    return NotFound();
                }
                return Ok(book);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut("{id:int}")]   // PUT /api/book/1
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            try
            {
                if(id != book.bookId)
                {
                  return BadRequest("Id in url and body mismatches");
                }
                if(!await _context.Book.AnyAsync(p => p.bookId == id))
                {
                   return NotFound(); // 404 status code
                }
                _context.Book.Update(book);
                await _context.SaveChangesAsync();
                return NoContent();  //204 status code
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id:int}")]   // PUT /api/book/1
        public async Task<IActionResult> DeleteBook(int id)
        {
            try
            {
                
                var book = await _context.Book.FindAsync(id);
                if(book is null)
                {
                    return NotFound();
                }
                _context.Book.Remove(book);
                await _context.SaveChangesAsync();
                return NoContent();  //204 status code
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
