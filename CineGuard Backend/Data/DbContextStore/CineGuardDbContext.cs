using CineGuard_Backend.Data.DbContextStore.Entities;
using Microsoft.EntityFrameworkCore;

namespace CineGuard_Backend.Data.DbContextStore
{
    public partial class CineGuardDbContext : DbContext
    {
        public CineGuardDbContext()
        {
        }

        public CineGuardDbContext(DbContextOptions<CineGuardDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Movie> Movies { get; set; } = null!;

        public virtual DbSet<MovieGuideSection> MovieGuideSections { get; set; } = null!;

        public virtual DbSet<MovieGuideItem> MovieGuideItems { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Movie>(entity =>
            {
                entity.ToTable("Movies");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(e => e.ScriptPath)
                    .IsRequired();
            });

            modelBuilder.Entity<MovieGuideSection>(entity =>
            {
                entity.ToTable("MovieGuideSections");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.MovieId)
                    .IsRequired();

                entity.Property(e => e.SectionType)
                    .IsRequired();

                entity.Property(e => e.SeverityLevel)
                    .IsRequired();

                entity.HasOne(e => e.Movie)
                    .WithMany(e => e.MovieGuideSections)
                    .HasForeignKey(e => e.MovieId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable(t => t.HasCheckConstraint(
                    "CK_MovieGuideSections_SectionType",
                    "SectionType BETWEEN 1 AND 5"));

                entity.ToTable(t => t.HasCheckConstraint(
                    "CK_MovieGuideSections_SeverityLevel",
                    "SeverityLevel BETWEEN 1 AND 4"));
            });

            modelBuilder.Entity<MovieGuideItem>(entity =>
            {
                entity.ToTable("MovieGuideItems");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.SectionId)
                    .IsRequired();

                entity.Property(e => e.Description)
                    .IsRequired();

                entity.Property(e => e.SeverityLevel)
                    .IsRequired();

                entity.HasOne(e => e.MovieGuideSection)
                    .WithMany(e => e.MovieGuideItems)
                    .HasForeignKey(e => e.SectionId)
                    .OnDelete(DeleteBehavior.NoAction);

                entity.ToTable(t => t.HasCheckConstraint(
                    "CK_MovieGuideItems_SeverityLevel",
                    "SeverityLevel BETWEEN 1 AND 4"));
            });
        }
    }
}