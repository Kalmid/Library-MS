using System.ComponentModel.DataAnnotations;

namespace Backend.Models;

public class Book
{
    public int bookId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(30)]
    public string Author { get; set; } = string.Empty;

    [Required]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
}