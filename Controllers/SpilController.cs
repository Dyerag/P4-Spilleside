using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpilAPI.Data;
using SpilAPI.DTO;
using SpilAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpilAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpilController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SpilController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/spil
        //ny kollone i spil databasen med icon/billede navn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpilDto>>> GetSpil()
        {
            return await _context.Spil
                .Select(s => new SpilDto
                {
                    SpilId = s.SpilId,
                    Navn = s.Navn,
                    IkonNavn = s.IkonNavn
                })
                .ToListAsync();
        }

        private bool SpilExists(int id)
        {
            return _context.Spil.Any(e => e.SpilId == id);
        }
    }
}
