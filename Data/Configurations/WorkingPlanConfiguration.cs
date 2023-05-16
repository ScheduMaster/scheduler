using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Application.Data.Entities;

namespace Application.Data
{
    public class WorkingPlanConfiguration : IEntityTypeConfiguration<WorkingPlan>
    {
        public void Configure(EntityTypeBuilder<WorkingPlan> builder)
        {
            builder.ToTable("working_plans");

            builder.HasKey(working_plan => working_plan.IdProvider);

            builder.HasOne(working_plan => working_plan.Provider)
                .WithMany()
                .HasForeignKey(working_plan => working_plan.IdProvider)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}