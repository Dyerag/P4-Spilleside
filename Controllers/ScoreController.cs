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
    public class ScoresController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ScoresController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/scores
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ScoreDto>>> GetScores()
        {
            return await _context.Scores
                .Include(s => s.Bruger)
                .Include(s => s.Spil)
                .Select(s => new ScoreDto
                {
                    Brugernavn = s.Bruger!.Brugernavn,
                    Spilnavn = s.Spil!.Navn,//
                    Point = s.Point,
                    Dato = s.Dato
                })
                .ToListAsync();
        }

        // POST: api/scores
        [HttpPost]
        public async Task<ActionResult<ScoreDto>> PostScore(ScoreCreateDto dto)
        {
            // Valider evt. at bruger og spil findes
            var bruger = await _context.Brugere.FindAsync(dto.BrugerId);
            var spil = await _context.Spil.FindAsync(dto.SpilId);

            if (bruger == null || spil == null)
                return BadRequest("Ugyldig BrugerId eller SpilId.");

            var score = new Score
            {
                BrugerId = dto.BrugerId,
                SpilId = dto.SpilId,
                Point = dto.Point,
                Dato = dto.Dato
            };

            _context.Scores.Add(score);
            await _context.SaveChangesAsync();

            return Ok();
        }

        

        // GET: api/scores/spil/{spilId}
        [HttpGet("spil/{spilId:int}")]
        public async Task<ActionResult<IEnumerable<ScoreDto>>> GetScoresBySpilId(int spilId)
        {
            var scores = await _context.Scores
                .AsNoTracking()
                .Where(s => s.SpilId == spilId)
                .Select(s => new ScoreDto
                {

                    Brugernavn = s.Bruger!.Brugernavn,
                    Spilnavn = s.Spil!.Navn,//
                    Point = s.Point,
                    Dato = s.Dato
                })
                .ToListAsync();

            return scores; 
        }
    }
}